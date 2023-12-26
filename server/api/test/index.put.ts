export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        setResponseStatus(event, 200)
        return {api: "Put Request", body: body}
    } catch (error) {
        setResponseStatus(event, 500)
        return {message: error}
    }
})