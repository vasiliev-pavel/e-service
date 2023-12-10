import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const owner_id = body.owner_id;

  const { data, error } = await client
    .from("businesses")
    .select("*")
    .eq("owner_id", owner_id);

  if (error) {
    console.error('Error fetching businesses:', error);
    return createError({ statusCode: 500, message: "Server error" });
  }

  return { data };
});
