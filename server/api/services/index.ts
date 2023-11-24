import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const salonId = event.context.params?.salonId;
  const categoryId = event.context.params?.categoryId;

  if (!salonId || !categoryId) {
    return { error: "Salon ID and Category ID are required" };
  }

  const { data } = await client
    .from("services")
    .select("*")
    .eq("business_id", salonId)
    .eq("category_id", categoryId);

  return { data };
});
