import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        // Init
        const query = getQuery(event);
        const client = await serverSupabaseClient(event);
        const businessID = query.business_id;

        // Query
        const { data, error } = await client
        .from("categories")
        .select("*")
        .eq("business_id", businessID);

        // Response
        if (error)
            throw createError({
                statusCode: parseInt(error.code),
                statusMessage: error.message,
            });
        
        setResponseStatus(event, 200)
        return {data: data, query: query}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error.message}
    }
})