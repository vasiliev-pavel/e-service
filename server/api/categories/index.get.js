import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        // Init
        const query = getQuery(event);
        const client = await serverSupabaseClient(event);
        const businessID = query.business_id;

        let queryBuilder = client.from("categories").select("*");

        if (businessID) 
            queryBuilder = queryBuilder.eq("business_id", businessID);
        
        const { data, error } = await queryBuilder;

        // Response
        if (error)
            throw createError({
                statusCode: parseInt(error.code),
                statusMessage: error.message,
            });
        
        setResponseStatus(event, 200)
        return { data: data}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error.message}
    }
})