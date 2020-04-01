export interface Route {
  path?: string
  name?: string
  hash?: string
  query?: Record<string, string | (string | null)[]>
  params?: Record<string, string>
  fullPath?: string
  redirectTo?: Route
  meta?: Record<string, unknown>
}
