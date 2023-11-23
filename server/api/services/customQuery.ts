// server/api/customQuery.ts
import { supabaseQuery } from "~/server/api/services/supabaseService";

export default defineEventHandler(async (event) => {
  const query = event.context.params;
  return await supabaseQuery(event, query);
});
