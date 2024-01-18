import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Получение динамического параметра salonId из URL
  const businessId = event.context.params?.businessId;
  if (!businessId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "businessId is required" };
  }

  // @ts-ignore
  const { data, error } = await client
    .from("businesses")
    .select("name")
    .eq("id", businessId);

  if (error) {
    console.error(error);
    return { error };
  }

  return { data };
});
