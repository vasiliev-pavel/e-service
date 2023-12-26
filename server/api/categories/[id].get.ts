export default defineEventHandler(async (event) => {
    try {
        const idParam = event?.context?.params?.id;
    
        // if (typeof idParam !== 'string') {
        //     throw createError({
        //       statusCode: 400,
        //       statusMessage: 'ID parameter is required and must be a string',
        //     });
        // }

        const id = parseInt(idParam);

        if (!Number.isInteger(id)) {
            throw createError({
              statusCode: 400,
              statusMessage: 'ID should be an integer',
            });
        }
          
        setResponseStatus(event, 200)
        return {api: "Get Request", body: id}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error}
    }
})