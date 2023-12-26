type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type RequestBody = Record<string, any> | undefined;

interface ApiResponse {
  data: any;
  error: any;
}

// const {data, error} = await callAPI('bussinesses/create', 'POST', body);
export async function callAPI(endpoint: string, method: RequestMethod, body: RequestBody): Promise<ApiResponse> {
  const { data, error } = await useFetch(`/api/${endpoint}`, {
    method: method,
    body: body,
  });
  return { data, error };
}
