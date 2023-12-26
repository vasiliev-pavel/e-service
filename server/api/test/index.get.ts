export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event)
        
        setResponseStatus(event, 200)
        return {api: "Get Request", query: query}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error}
    }
})