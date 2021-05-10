import {Owner} from "../owner/entities/owner.entity";

export type CreateUserResponse = {
  status: boolean
  id: string,
  ownerId: string,
  name: string,
  createdAt: Date,
} | {
  status: boolean,
  msg: string
}