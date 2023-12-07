import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const { name, owner_id } = await readBody(event);

    // Проверка входящих данных
    if (!name) 
        return createError({ statusCode: 400, message: "Name is required" });
    if (!owner_id) 
        return createError({ statusCode: 400, message: "Owner ID is required" });
        

    // Добавление записи в таблицу businesses
    const { data, error } = await client.from('businesses').insert([{ name, owner_id }]);

    if (error) {
        console.error('Error creating business', error);
        return { error };
    }

    return { data };
});