// export type LogInOwnerResponse = {
//   status: true,
//   ownerId: string,
//   // authToken: string,
// } | {
//   status: false,
//   error: string
// }

import {Owner} from "../owner/entities/owner.entity";

export type LogInOwnerReturn = Owner | false
