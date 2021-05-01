export type CreateOwnerResponse = {
  id: string,
  email: string,
  createdAt: Date
} | {
  error: string | boolean
}