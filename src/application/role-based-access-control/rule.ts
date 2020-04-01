export type Permission = string
export type AccesCondition = (data: Record<string, unknown>) => boolean

export interface Rule {
  static?: Permission[]
  dynamic?: Record<Permission, AccesCondition>
}
