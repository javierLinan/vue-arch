export interface ValidationConstraint {
  check(element: unknown, validationAgs: Record<string, unknown>): boolean
}
