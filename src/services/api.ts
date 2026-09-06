const BASE_URL = process.env.REACT_APP_STRAPI_URL
const TOKEN = process.env.REACT_APP_STRAPI_TOKEN

async function request(method: string, path: string, body: unknown = null) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    }
  }
  if (body) options.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}/api/${path}`, options)

  if (res.status === 204) return null

  const data = await res.json()

  if (!res.ok) {
    const err = new Error(data.error?.message || `Error ${res.status}`)
    throw err
  }

  return data
}

export const api = {
  get: (path: string) => request('GET', path),
  post: (path: string, body: unknown) => request('POST', path, body),
  put: (path: string, body: unknown) => request('PUT', path, body),
  patch: (path: string, body: unknown) => request('PATCH', path, body),
  delete: (path: string) => request('DELETE', path),
}
