import { useAuthStore } from '@/store/auth.store'

const GQL_URL = import.meta.env.VITE_GRAPHQL_URL ?? 'http://localhost:4000/graphql'

export async function gqlRequest<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const token = useAuthStore.getState().token
  const operationName = query.match(/(?:query|mutation)\s+(\w+)/)?.[1] ?? 'unknown'

  console.log(`[gqlRequest] ${operationName} — token:`, token ? `${token.slice(0, 20)}…` : 'MISSING')

  const res = await fetch(GQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  })

  const json = await res.json()
  console.log(`[gqlRequest] ${operationName} — response:`, json)

  if (json.errors) throw new Error(json.errors[0].message)
  return json.data as T
}
