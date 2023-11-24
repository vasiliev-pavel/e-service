// server/api/business_categories/_salonId.ts
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Получение динамического параметра salonId из URL
  const salonId = event.context.params?.salonId;
  if (!salonId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "Salon ID is required" };
  }

  const { data, error } = await client
    .from("business_categories")
    .select("*")
    .eq("business_id", salonId);

  if (error) {
    return { error };
  }
  // console.log(data);
  return { data };
});
