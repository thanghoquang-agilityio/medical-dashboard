export const createErrorResponse = (message: string, status = 422) =>
  Response.json({ data: null, error: message }, { status });
