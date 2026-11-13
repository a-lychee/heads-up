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

const original = (id: string) => slides.find((slide) => slide.id === id)?.notes ?? '';

export function useSpeakerNotes() {
  const [edits, setEdits] = useState<NotesMap>(readLocal);
  const [sync, setSync] = useState<NotesSync>(sharedNotesConfigured ? 'saving' : 'local');
  const pending = useRef<Record<string, number>>({});
  const firstLoad = useRef(true);

  // Load shared edits, then keep refreshing so teammates' edits show up. Edits still being typed here win.
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
      if (Object.keys(pending.current).length === 0) setSync('shared');
    } catch {
      setSync('local');
    }
  }, []);

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
        if (Object.keys(pending.current).length === 0) setSync('shared');
      } catch {
        delete pending.current[id];
        setSync('local');
      }
    }, SAVE_DELAY_MS);
  }, []);

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

  return { notesFor, isEdited, saveNotes, resetNotes, exportAll, editedCount: Object.keys(edits).length, sync };
}
