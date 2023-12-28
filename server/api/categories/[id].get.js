import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        const id = event?.context?.params?.id;
        const client = await serverSupabaseClient(event);
    

        const { data, error } = await client
        .from("categories")
        .select("*")
        .eq("id", id);
          
        setResponseStatus(event, 200)
        return { data: data}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error.message}
    }
})