import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const businessId = body.id;
  const ownerId = body.owner_id;

  if (!businessId) {
    return createError({ statusCode: 400, message: "Business ID is required" });
  }

  const { data, error } = await client
    .from("businesses")
    .delete()
    .eq("id", businessId)
    .eq("owner_id", ownerId);

  if (error) {
    return { message: error };
  }

  return { success: true };
});
