export class AssignExerciseDto {
  userId: string
  ownerId: string // for authorization
  // exerciseId: string // from @Param
}

//To validation required fields
//mozna by tu dorobic sprawdzanie typow np userId: ['string','number'] i wtedy sprawdzac typ przeslanej wartosci (in indexOf)
//mozna zrobic tez customowo np dla 'name', regex
//TODO zrobic porzadna walidacje i zastosowac w calym projekcie
export const AssignExerciseDtoProperties = {
  userId: 'abcd',
  ownerId: 'abcd'
}