import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Shared speaker notes, stored in the project's Lovable Cloud database (table `presenter_notes`), so an edit made
// in any browser is saved permanently and shows up for the whole team.
//
// Rows are keyed `deck-v2:<slide id>`. The prefix keeps any rows left over from an older version of the deck from
// overriding today's notes. If the database can't be reached, the deck falls back to saving in the browser.

const URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
const TABLE = 'presenter_notes';
const PREFIX = 'deck-v2:';

// Newer Supabase keys (sb_publishable_…) are sent as `apikey`, not as a bearer token.
function keyedFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(typeof Request !== 'undefined' && input instanceof Request ? input.headers : undefined);
    if (init?.headers) new Headers(init.headers).forEach((value, name) => headers.set(name, value));
    if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey', key);
    return fetch(input, { ...init, headers });
  };
}

const client: SupabaseClient | null =
  URL && KEY
    ? createClient(URL, KEY, { global: { fetch: keyedFetch(KEY) }, auth: { persistSession: false, autoRefreshToken: false } })
    : null;

export const sharedNotesConfigured = client !== null;

/** All shared edits, by slide id. Throws if the database can't be reached. */
export async function fetchSharedNotes(): Promise<Record<string, string>> {
  if (!client) throw new Error('Shared notes are not configured');
  const { data, error } = await client.from(TABLE).select('slide_id, content').like('slide_id', `${PREFIX}%`);
  if (error) throw error;
  const notes: Record<string, string> = {};
  for (const row of data ?? []) notes[String(row.slide_id).slice(PREFIX.length)] = String(row.content ?? '');
  return notes;
}

export async function saveSharedNote(slideId: string, content: string) {
  if (!client) throw new Error('Shared notes are not configured');
  const { error } = await client
    .from(TABLE)
    .upsert({ slide_id: PREFIX + slideId, content, updated_at: new Date().toISOString() }, { onConflict: 'slide_id' });
  if (error) throw error;
}

export async function deleteSharedNote(slideId: string) {
  if (!client) throw new Error('Shared notes are not configured');
  const { error } = await client.from(TABLE).delete().eq('slide_id', PREFIX + slideId);
  if (error) throw error;
}
