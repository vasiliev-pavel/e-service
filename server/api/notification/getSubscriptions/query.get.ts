// server/api/business_categories/_salonId.ts
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const query = getQuery(event);

  if (!query) {
    // Обработка ситуации, когда salonId не предоставлен
    return { error: "query is required" };
  }

  const { data, error } = await client
    .from("notifications")
    .select("endpoint")
    .eq("user_id", query.userId)
    .eq("browser", query.browser)
    .eq("device", query.os);
  if (error) {
    return { error };
  }

  return { data };
});
