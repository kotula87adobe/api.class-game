import { Injectable } from '@nestjs/common';
import {OwnerSessionToken} from "./entities/ownerSessionToken.entity";
import {Owner} from "../owner/entities/owner.entity";

@Injectable()
export class OwnerSessionTokenService {

  async create(owner: Owner): Promise<OwnerSessionToken>{

    const ownerSessionToken = new OwnerSessionToken()
    ownerSessionToken.owner = owner

    await ownerSessionToken.save()

    return ownerSessionToken
  }

}
