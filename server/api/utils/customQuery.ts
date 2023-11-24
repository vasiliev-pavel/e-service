// server/api/customQuery.ts
import { supabaseQuery } from "~/server/api/utils/supabaseService";

export default defineEventHandler(async (event) => {
  const query = event.context.params;
  return await supabaseQuery(event, query);
});
