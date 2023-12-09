import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data, error } = await client.rpc('get_appointments');
  
  if (error) {
    console.error('Error fetching appointments', error);
    return { error };
  }

  return { data };
});


