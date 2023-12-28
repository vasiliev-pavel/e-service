import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const client = await serverSupabaseClient(event);
        const id = typeof body.id === 'string' ? body.id : null;
        const business_id = typeof body.business_id === 'string' ? body.business_id : null;

        if (!id) return createError({ statusCode: 400, message: "ID is Required" });
        if (!business_id) return createError({ statusCode: 400, message: "Business ID is Required" });


        const { data, error } = await client
        .from('categories')
        .delete()
        .eq("id", id)
        .eq("business_id", business_id);

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