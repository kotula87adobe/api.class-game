import {Owner} from "../owner/entities/owner.entity";

export type CreateUserResponse = {
  id: string,
  owner: Owner,
  createdAt: Date,
}