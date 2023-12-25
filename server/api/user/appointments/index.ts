import { serverSupabaseClient } from "#supabase/server";
import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
  //   const client = await serverSupabaseClient(event);
  const supabase = createClient(
    "https://icxffjgtyxtojlastxbu.supabase.co/",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeGZmamd0eXh0b2psYXN0eGJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDQ5Njk1NCwiZXhwIjoyMDE2MDcyOTU0fQ.2GLIS-uXdUzLna__Dvt7pOcdlIFjMGDJtWOBDbiA0mw",
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );

  const { data, error } = await supabase.auth.admin.inviteUserByEmail(
    "vasilievpavel795@gmail.com"
  );
  console.log(data);
  console.log(error);

  //   const { data, error } = await client.from("businesses").select("*");

  if (error) {
    console.error("Error fetching", error);
    return { error };
  }

  return { data };
});
