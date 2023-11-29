import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  if (!body) {
    return { error: "body are required" };
  }

  const { error } = await client.from("notifications").insert(body);
  // console.error(error);
  return { error };
});
