import { useCallback, useEffect, useState } from 'react';
import { slides } from '../slides';

// Speaker notes start from each slide's `notes` in its slide file. Edits made in the deck are saved in this
// browser (localStorage), keyed by slide id, so they survive reloads and show up in both the editor and the
// presenter window. They are not written back to the code: use "Copy all notes" to move them into the slide files.

const STORAGE_KEY = 'heads-up-speaker-notes';

type NotesMap = Record<string, string>;

function readEdits(): NotesMap {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '{}');
    return parsed && typeof parsed === 'object' ? (parsed as NotesMap) : {};
  } catch {
    return {};
  }
}

function writeEdits(edits: NotesMap) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

export function useSpeakerNotes() {
  const [edits, setEdits] = useState<NotesMap>(readEdits);

  // Keep the editor and presenter windows in step: another window's save fires a storage event here.
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setEdits(readEdits());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const notesFor = useCallback(
    (id: string) => edits[id] ?? slides.find((slide) => slide.id === id)?.notes ?? '',
    [edits],
  );

  const isEdited = useCallback((id: string) => id in edits, [edits]);

  const saveNotes = useCallback((id: string, text: string) => {
    setEdits((current) => {
      const original = slides.find((slide) => slide.id === id)?.notes ?? '';
      const next = { ...current };
      if (text === original) delete next[id];
      else next[id] = text;
      writeEdits(next);
      return next;
    });
  }, []);

  const resetNotes = useCallback((id: string) => {
    setEdits((current) => {
      const next = { ...current };
      delete next[id];
      writeEdits(next);
      return next;
    });
  }, []);

  /** Every slide's current notes as plain text, for pasting back into the slide files or a doc. */
  const exportAll = useCallback(
    () => slides.map((slide, index) => `${index + 1}. ${slide.title} (${slide.id})\n${edits[slide.id] ?? slide.notes}`).join('\n\n'),
    [edits],
  );

  return { notesFor, isEdited, saveNotes, resetNotes, exportAll, editedCount: Object.keys(edits).length };
}
