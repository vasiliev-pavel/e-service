import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const { full_name, business_id, role } = await readBody(event);

    // Проверка входящих данных
    if (!full_name) 
        return createError({ statusCode: 400, message: "Full Name is required" });
    if (!business_id) 
        return createError({ statusCode: 400, message: "Business ID is required" });
    if (!role) 
        return createError({ statusCode: 400, message: "Role is required" });
        

    // Добавление записи в таблицу profiles
    // const { data, error } = await client.from('profiles').insert([{ full_name, role }]);
    console.log(data)

    if (error) {
        console.error('Error creating specialist', error);
        return { error };
    }

    return { data };
});