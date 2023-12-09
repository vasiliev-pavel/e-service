import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const body = await readBody(event);
  const businessId = body.id;
  const ownerId = body.owner_id;

  if (!businessId) {
    return createError({ statusCode: 400, message: "Business ID is required" });
  }

  // Check if the business belongs to the owner before deleting
  const { data: businesses, error: fetchError } = await client
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .eq("owner_id", ownerId);

  if (fetchError || businesses.length === 0) {
    console.error('Error fetching business or business not found:', fetchError);
    return createError({ statusCode: 404, message: "Business not found or access denied" });
  }

  const { error: deleteError } = await client
    .from("businesses")
    .delete()
    .eq("id", businessId);

  if (deleteError) {
    console.error('Error deleting business:', deleteError);
    return createError({ statusCode: 500, message: "Server error" });
  }

  return { success: true };
});
