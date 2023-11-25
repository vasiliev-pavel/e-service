import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const specialistId = event.context.params?.specialistId;

  if (!specialistId) {
    return { error: "Salon ID and Category ID are required" };
  }
  const { data } = await client
    .from("availability")
    .select("*")
    .eq("specialist_id", specialistId);
  // console.log(data);
  return { data };
});
