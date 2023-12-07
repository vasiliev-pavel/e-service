import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client.from('businesses').select('*');
  
  if (error) {
    console.error('Error fetching businesses', error);
    return { error };
  }

  return { data };
});
