import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  if (!body) {
    return { error: "body are required" };
  }

  const { data, error } = await client
    .from("notifications")
    .select("endpoint")
    .eq("user_id", body);

  if (error) {
    return { error };
  }
  // console.log(data);
  return { data };
});
