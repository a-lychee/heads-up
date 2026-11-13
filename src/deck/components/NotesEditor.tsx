import { useEffect, useState, type CSSProperties } from 'react';
import { RotateCcw } from 'lucide-react';

interface NotesEditorProps {
  slideId: string;
  value: string;
  edited: boolean;
  onSave: (id: string, text: string) => void;
  onReset: (id: string) => void;
  /** Where edits are being saved: for everyone ('shared'), on their way ('saving'), or only in this browser ('local'). */
  sync?: 'shared' | 'saving' | 'local';
  /** Why shared notes are unavailable, straight from the database. */
  syncError?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Speaker notes you can click into and type. Saves as you type (for the whole team when the shared notes database
 * is reachable, otherwise in this browser) and shows a small status line.
 * Arrow keys and the other deck shortcuts are ignored while the cursor is in the box.
 */
export function NotesEditor({ slideId, value, edited, onSave, onReset, sync = 'local', syncError, className = '', style }: NotesEditorProps) {
  const [draft, setDraft] = useState(value);
  const [justSaved, setJustSaved] = useState(false);

  // Load the new slide's notes when the slide changes (or another window saves).
  useEffect(() => setDraft(value), [slideId, value]);

  useEffect(() => {
    if (!justSaved) return;
    const timeout = window.setTimeout(() => setJustSaved(false), 1500);
    return () => window.clearTimeout(timeout);
  }, [justSaved]);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <textarea
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          onSave(slideId, event.target.value);
          setJustSaved(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') event.currentTarget.blur();
        }}
        spellCheck
        aria-label="Speaker notes (editable)"
        placeholder="Add speaker notes…"
        className={`deck-scrollbar min-h-0 w-full flex-1 resize-none rounded-lg border border-transparent bg-transparent outline-none transition-colors hover:border-white/10 focus:border-white/20 focus:bg-white/[0.03] ${className}`}
        style={style}
      />
      <div className="flex h-[22px] flex-shrink-0 items-center gap-3 text-[12px] text-white/40">
        <span className={`truncate ${sync === 'local' ? 'text-[var(--deck-timer-amber)]' : ''}`} title={syncError}>
          {sync === 'saving'
            ? edited || justSaved ? 'Saving…' : 'Click to edit'
            : sync === 'local'
              ? `Saved in this browser only (shared notes unavailable${syncError ? `: ${syncError}` : ''})`
              : justSaved ? 'Saved for everyone' : edited ? 'Edited · saved for everyone' : 'Click to edit'}
        </span>
        {edited && (
          <button
            type="button"
            onClick={() => onReset(slideId)}
            className="flex items-center gap-1 text-white/50 hover:text-white"
            title="Go back to the notes in the slide file"
          >
            <RotateCcw size={12} />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
