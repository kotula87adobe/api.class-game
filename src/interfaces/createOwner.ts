export type CreateOwnerResponse = {
  error: false,
  id: string,
  name: string,
  createdAt: Date
} | {
  error: string | boolean
}