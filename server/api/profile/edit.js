import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const { full_name, id } = await readBody(event);

    // Проверка входящих данных
    if (!full_name) 
        return createError({ statusCode: 400, message: "Name is required" });
    if (!id) 
        return createError({ statusCode: 400, message: "User ID is required" });
        

    const { data, error } = await client
        .from('profiles')
        .update({ full_name })
        .match({ id });
    

    if (error) {
        console.error('Error updating profile', error);
        return { error };
    }

    return { data };
});