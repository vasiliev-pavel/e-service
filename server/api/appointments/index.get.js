import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    try {
        // Init
        const query = getQuery(event);
        const client = await serverSupabaseClient(event);

        const clientID = query.client_id;
        const specialistID = query.specialist_id;
        const serviceID = query.service_id;
        const categoryID = query.category_id;
        const businessID = query.business_id;

        // Query
        let queryBuilder = client.from("appointments").select("*");

        if (clientID) 
            queryBuilder = queryBuilder.eq("client_id", clientID);
        if (specialistID) 
            queryBuilder = queryBuilder.eq("specialist_id", specialistID);
        if (serviceID) 
            queryBuilder = queryBuilder.eq("service_id", serviceID);
        if (categoryID) 
            queryBuilder = queryBuilder.eq("category_id", categoryID);
        if (businessID) 
            queryBuilder = queryBuilder.eq("business_id", businessID);
        

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