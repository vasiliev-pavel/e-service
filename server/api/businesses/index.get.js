import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        // Init
        const query = getQuery(event);
        const client = await serverSupabaseClient(event);
        const ownerID = query.owner_id;

        // Query
        let queryBuilder = client.from("businesses").select("*");

        if (ownerID) {
            queryBuilder = queryBuilder.eq("owner_id", ownerID);
        }

        // Executing the query
        const { data, error } = await queryBuilder;

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