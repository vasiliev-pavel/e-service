// server/api/services.ts
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Убедитесь, что params определены
  const salonId = event.context.params?.salonId;
  if (!salonId) {
    // Обработайте ситуацию, когда salonId не предоставлен
    return { error: "Salon ID is required" };
  }
  // console.log(salonId);
  const { data } = await client
    .from("business_categories")
    .select("*")
    .eq("business_id", salonId);
  // console.log(data);
  return { data };
});
