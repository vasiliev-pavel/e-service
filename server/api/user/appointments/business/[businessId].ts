import { serverSupabaseClient } from "#supabase/server";
import moment from "moment";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const now = moment().toISOString(); // Преобразование текущего времени в строку ISO 8601
  // Получение динамического параметра salonId из URL
  const businessId = event.context.params?.businessId;
  if (!businessId) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "business_id ID is required" };
  }

  // @ts-ignore
  const { data, error } = await client
    .from("appointments")
    .select("id,date_time,service_id,category_id,specialist_id")
    .eq("business_id", businessId);
  // .gte("date_time", now); // Использование текущего времени в формате ISO 8601
  if (error) {
    console.error(error);
    return { error };
  }

  return { data };
});
