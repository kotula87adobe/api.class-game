import { Injectable } from '@nestjs/common';
import {CreateOwnerSessionTokenResponse} from "../interfaces/createOwnerSessionToken";
import {OwnerSessionToken} from "../owner-session-token/entities/ownerSessionToken.entity";
import {Owner} from "../owner/entities/owner.entity";

@Injectable()
export class SessionTokenService {

  async create(ownerId: string):Promise<CreateOwnerSessionTokenResponse>{

    const owner = await Owner.findOne(ownerId)

    const ownerSessionToken = new OwnerSessionToken()
    ownerSessionToken.owner = owner
    await ownerSessionToken.save()

    return {
      ownerSessionToken: ownerSessionToken.id
    }

  }

}
