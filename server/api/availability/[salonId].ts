import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const salonId = event.context.params?.salonId;
  if (!salonId) {
    return { error: "Salon ID and Category ID are required" };
  }
  const { data } = await client
    .from("availability")
    .select(
      "specialist_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday"
    )
    .eq("business_id", salonId);

  return { data };
});
