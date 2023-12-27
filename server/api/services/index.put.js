import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const client = await serverSupabaseClient(event);

        const id = typeof body.id === 'string' ? body.id : null;
        const name = typeof body.name === 'string' ? body.name : null;
        const business_id = typeof body.business_id === 'string' ? body.business_id : null;
        const duration = body.duration;
        const price = body.price;
        const category_id = body.category_id;

        if (!id) return createError({ statusCode: 400, message: "ID is Required" });
        if (!name) return createError({ statusCode: 400, message: "Service Name is Required" });
        if (!business_id) return createError({ statusCode: 400, message: "Business ID is Required" });
        if (!duration) return createError({ statusCode: 400, message: "Duration is Required" });
        if (!price) return createError({ statusCode: 400, message: "Price is Required" });
        if (!category_id) return createError({ statusCode: 400, message: "Category ID is Required" });


        const { data, error } = await client
        .from('services')
        .update({ name: name, duration: duration, price: price, category_id: category_id })
        .match({ id: id, business_id: business_id });

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