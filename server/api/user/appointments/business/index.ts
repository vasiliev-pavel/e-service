import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  // Получение динамического параметра salonId из URL
  const body = await readBody(event);
  if (!body) {
    return { error: "body are required" };
  }
  // console.log(body);
  // @ts-ignore
  const { data, error } = await client
    .from("appointments")
    .select("id,date_time,service_id,category_id,specialist_id")
    .eq("business_id", body.id)
    .in("specialist_id", body.speciliastIds)
    .gte("date_time", body.startDay)
    .lte("date_time", body.endDay);

  if (error) {
    console.error(error);
    return { error };
  }
  // console.log(data);
  return { data };
});
