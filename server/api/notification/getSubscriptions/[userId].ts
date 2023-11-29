// server/api/business_categories/_salonId.ts
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Получение динамического параметра salonId из URL
  const userId = event.context.params?.userId;
  if (!userId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "Salon ID is required" };
  }

  const { data, error } = await client
    .from("notifications")
    .select("endpoint")
    .eq("user_id", userId);

  if (error) {
    return { error };
  }

  return { data };
});
