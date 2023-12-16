import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const { name, business_id } = await readBody(event);

    // Проверка входящих данных
    if (!name) 
        return createError({ statusCode: 400, message: "Name is required" });
    if (!business_id) 
        return createError({ statusCode: 400, message: "Business ID is required" });
        

    // Добавление записи в таблицу businesses
    const { data, error } = await client.from('categories').insert([{ name, business_id }]);

    if (error) {
        console.error('Error creating business', error);
        return { error };
    }

    return { data };
});