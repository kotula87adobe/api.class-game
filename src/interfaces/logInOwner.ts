export type LogInOwnerResponse = {
  status: true,
  ownerId: string,
  authToken: string,
} | {
  status: false,
  error: string
}
