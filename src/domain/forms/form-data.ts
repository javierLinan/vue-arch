export interface FormData {
  $clear(): void
  $update(partial: Partial<unknown>): void
}
