// services/supabaseService.js
import { serverSupabaseClient } from "#supabase/server";

export async function supabaseQuery(event, query) {
  const client = await serverSupabaseClient(event);
  return await client.from(query.table).select(query.select).match(query.match);
}
