import {Inject, Injectable} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {OwnerService} from "../owner/owner.service";
import {LogInOwnerDto} from "../owner/dto/log-in-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {LogInOwnerReturn} from "../interfaces/logInOwner";
import {OwnerSessionTokenService} from "../owner-session-token/owner-session-token.service";
import {LogInOwnerResponse} from "../interfaces/loginOwnerResponse";

import {Request} from "express";
import {OwnerSessionToken} from "../owner-session-token/entities/ownerSessionToken.entity";
import {LogOutResponse} from "../interfaces/logOut";
import {Owner} from "../owner/entities/owner.entity";

@Injectable()
export class AuthService {

  constructor(
    @Inject(OwnerService) private ownerService: OwnerService,
    @Inject(OwnerSessionTokenService) private ownerSessionTokenService: OwnerSessionTokenService
  ) {
  }

  async checkIfOwnerIsLogged(request: Request, owner: Owner): Promise<boolean> {
    //TODO uzywac przy wszystkich operacjach wymagajacych autoryzacji ?
    const authToken = request.headers.authorization ? request.headers.authorization : ''
    const ownerSessionToken = await OwnerSessionToken.findOne({
      id: authToken,
      isActive: true
    }, {loadRelationIds: true})

    // @ts-ignore
    return ownerSessionToken.owner === owner.id;

  }

  createOwner(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
    return this.ownerService.create(createOwnerDto)
  }

  async logIn(logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerResponse> {

    const owner = await this.ownerService.logIn(logInOwnerDto)

    if (owner) {

      const ownerSessionToken = await this.ownerSessionTokenService.create(owner)

      return {
        status: true,
        authToken: ownerSessionToken.id,
        ownerId: owner.id
      }

    } else {
      return {
        status: false,
        error: 'Logowanie nie powiodlo się'
      }
    }

  }

  async logOut(request: Request): Promise<LogOutResponse> { //TODO dodac typ

    const token = request.headers.authorization

    const ownerSessionToken = await this.ownerSessionTokenService.findOne(token)

    if (ownerSessionToken) {
      ownerSessionToken.isActive = false
      await ownerSessionToken.save()

      return {
        status: true,
        msg: "Wylogowano poprawnie"
      }
    } else {
      return {
        status: false,
        msg: "Nie mozna wykonac tej operacji"
      }
    }


  }
}
