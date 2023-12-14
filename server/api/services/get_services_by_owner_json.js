import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const owner_id = body.owner_id;

  if (!owner_id) {
    throw createError({ statusCode: 400, message: "Owner ID is required" });
  }

  const { data, error } = await client.rpc('get_services_by_owner_json', { owner_uuid: owner_id });

  if (error) {
    console.error('Error fetching services by owner ID', error);
    throw createError({ statusCode: 500, message: "Internal Server Error" });
  }

  return { data };
});
