import { serverSupabaseClient } from "#supabase/server";


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const client = await serverSupabaseClient(event);

        
        const client_id = typeof body.client_id === 'string' ? body.client_id : null;
        const specialist_id = typeof body.specialist_id === 'string' ? body.specialist_id : null;
        const service_id = typeof body.service_id === 'string' ? body.service_id : null;
        const date_time = body.date_time;
        const status = body.status;
        const notes = body.notes;
        const category_id = typeof body.category_id === 'string' ? body.category_id : null;
        const business_id = typeof body.business_id === 'string' ? body.business_id : null;

        if (!client_id) return createError({ statusCode: 400, message: "Client ID is Required" });
        if (!specialist_id) return createError({ statusCode: 400, message: "Specialist ID is Required" });
        if (!service_id) return createError({ statusCode: 400, message: "Service ID is Required" });
        if (!date_time) return createError({ statusCode: 400, message: "Date Time is Required" });
        if (!status) return createError({ statusCode: 400, message: "Status is Required" });
        if (!notes) return createError({ statusCode: 400, message: "Notes is Required" });
        if (!category_id) return createError({ statusCode: 400, message: "Category ID is Required" });
        if (!business_id) return createError({ statusCode: 400, message: "Business ID is Required" });
        


        const { data, error } = await client.from('appointments').insert([
            {
                client_id: client_id,
                specialist_id: specialist_id,
                service_id: service_id,
                date_time: date_time,
                status: status,
                notes: notes,
                category_id: category_id,
                business_id: business_id,
            }
        ]);

        if (error)
            throw createError({
                statusCode: parseInt(error.code),
                statusMessage: error.message,
            });

        setResponseStatus(event, 200)
        return {api: "Post Request", data: data}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error.message}
    }
})