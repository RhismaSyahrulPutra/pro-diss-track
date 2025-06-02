const host = import.meta.env.VITE_BACKEND_HOST;
const port = import.meta.env.VITE_BACKEND_PORT;

export const BASE_URL = port ? `${host}:${port}` : host;
