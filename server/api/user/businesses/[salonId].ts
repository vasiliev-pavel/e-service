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

  // @ts-ignore
  const { data, error } = await client.rpc(
    "get_business_data_formatted_test3", // @ts-ignore
    {
      business_uuid: salonId,
    }
  );

  if (error) {
    console.error(error);
    return { error };
  }
  return { data };
});
