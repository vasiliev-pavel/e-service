import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const user_id = body.user_id;

  const { data, error } = await client
    .from("profiles")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return createError({ statusCode: 500, message: "Server error" });
  }

  return { data };
});
