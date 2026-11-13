import { useCallback, useEffect, useRef, useState } from 'react';
import { deleteSharedNote, fetchSharedNotes, saveSharedNote, sharedNotesConfigured } from '../lib/sharedNotes';
import { slides } from '../slides';

// Speaker notes start from each slide's `notes` in its slide file. Edits made in the deck are saved permanently to
// the shared database (see lib/sharedNotes.ts), so the whole team sees them on any computer. This browser also keeps
// a copy, which is used if the database can't be reached and keeps the editor and presenter windows in step.

const STORAGE_KEY = 'heads-up-speaker-notes';
const SAVE_DELAY_MS = 600;
const REFRESH_MS = 20_000;

type NotesMap = Record<string, string>;
/** 'shared': saved for everyone. 'saving': an edit is on its way. 'local': database unreachable, saved in this browser. */
export type NotesSync = 'shared' | 'saving' | 'local';

function readLocal(): NotesMap {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? (parsed as NotesMap) : {};
  } catch {
    return {};
  }
}

function writeLocal(edits: NotesMap) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
  } catch {
    // Storage can be unavailable (e.g. in some embedded previews); the shared database still has the edit.
  }
}

/** A short, readable version of a database or network error. */
function describeError(error: unknown): string {
  if (error && typeof error === 'object') {
    const e = error as { message?: string; code?: string; details?: string; hint?: string; status?: number };
    return [e.code, e.message, e.details, e.hint].filter(Boolean).join(' · ') || String(error);
  }
  return String(error);
}

const original = (id: string) => slides.find((slide) => slide.id === id)?.notes ?? '';

export function useSpeakerNotes() {
  const [edits, setEdits] = useState<NotesMap>(readLocal);
  const [sync, setSync] = useState<NotesSync>(sharedNotesConfigured ? 'saving' : 'local');
  const pending = useRef<Record<string, number>>({});
  const firstLoad = useRef(true);
  // The database's own error message, shown under the notes box when shared notes are unavailable.
  const [syncError, setSyncError] = useState<string | undefined>(sharedNotesConfigured ? undefined : 'database settings (VITE_SUPABASE_URL / KEY) are missing in this build');

  // Load shared edits, then keep refreshing so teammates' edits show up. Edits still being typed here win.
  const reportError = useCallback((error: unknown) => {
    const message = describeError(error);
    console.error('[speaker notes] shared notes unavailable:', error);
    setSyncError(message);
  }, []);

  const refresh = useCallback(async () => {
    if (!sharedNotesConfigured) return;
    try {
      const shared = await fetchSharedNotes();
      // On the first load, edits this browser made before notes were shared get uploaded rather than dropped.
      const local = firstLoad.current ? readLocal() : {};
      const toUpload = Object.keys(local).filter((id) => !(id in shared) && slides.some((slide) => slide.id === id));
      firstLoad.current = false;
      setEdits((current) => {
        const next: NotesMap = { ...shared };
        for (const id of toUpload) next[id] = local[id];
        for (const id of Object.keys(pending.current)) {
          if (id in current) next[id] = current[id];
        }
        writeLocal(next);
        return next;
      });
      await Promise.all(toUpload.map((id) => saveSharedNote(id, local[id])));
      setSyncError(undefined);
      if (Object.keys(pending.current).length === 0) setSync('shared');
    } catch (error) {
      reportError(error);
      setSync('local');
    }
  }, [reportError]);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => { if (document.visibilityState === 'visible') void refresh(); }, REFRESH_MS);
    const onFocus = () => void refresh();
    window.addEventListener('focus', onFocus);
    // Another window in this browser saved: pick it up straight away.
    const onStorage = (event: StorageEvent) => { if (event.key === STORAGE_KEY) setEdits(readLocal()); };
    window.addEventListener('storage', onStorage);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('storage', onStorage);
    };
  }, [refresh]);

  const push = useCallback((id: string, text: string | null) => {
    if (!sharedNotesConfigured) return;
    window.clearTimeout(pending.current[id]);
    setSync('saving');
    pending.current[id] = window.setTimeout(async () => {
      try {
        if (text === null) await deleteSharedNote(id);
        else await saveSharedNote(id, text);
        delete pending.current[id];
        setSyncError(undefined);
        if (Object.keys(pending.current).length === 0) setSync('shared');
      } catch (error) {
        delete pending.current[id];
        reportError(error);
        setSync('local');
      }
    }, SAVE_DELAY_MS);
  }, [reportError]);

  const notesFor = useCallback((id: string) => edits[id] ?? original(id), [edits]);
  const isEdited = useCallback((id: string) => id in edits, [edits]);

  const saveNotes = useCallback((id: string, text: string) => {
    const isOriginal = text === original(id);
    setEdits((current) => {
      const next = { ...current };
      if (isOriginal) delete next[id];
      else next[id] = text;
      writeLocal(next);
      return next;
    });
    push(id, isOriginal ? null : text);
  }, [push]);

  const resetNotes = useCallback((id: string) => {
    setEdits((current) => {
      const next = { ...current };
      delete next[id];
      writeLocal(next);
      return next;
    });
    push(id, null);
  }, [push]);

  /** Every slide's current notes as plain text, for pasting into the slide files or a doc. */
  const exportAll = useCallback(
    () => slides.map((slide, index) => `${index + 1}. ${slide.title} (${slide.id})\n${edits[slide.id] ?? slide.notes}`).join('\n\n'),
    [edits],
  );

  return { notesFor, isEdited, saveNotes, resetNotes, exportAll, editedCount: Object.keys(edits).length, sync, syncError };
}
