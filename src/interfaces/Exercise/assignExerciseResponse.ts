export type AssignExerciseResponse = {
  status: true,
  exerciseId: string,
  userId: string,
  url: string
} | {
  status: false,
  msg: string
}