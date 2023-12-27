import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const client = await serverSupabaseClient(event);

        const id = typeof body.id === 'string' ? body.id : null;
        const name = typeof body.name === 'string' ? body.name : null;
        const owner_id = typeof body.owner_id === 'string' ? body.owner_id : null;

        if (!id) return createError({ statusCode: 400, message: "ID is Required" });
        if (!name) return createError({ statusCode: 400, message: "Business Name is Required" });
        if (!owner_id) return createError({ statusCode: 400, message: "Owner ID is Required" });


        const { data, error } = await client
        .from('businesses')
        .update({ name: name })
        .match({ id: id, owner_id: owner_id });

        if (error)
            throw createError({
                statusCode: parseInt(error.code),
                statusMessage: error.message,
            });

        setResponseStatus(event, 200)
        return {api: "Put Request", data: data}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error.message}
    }
})