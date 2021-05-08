import {Inject, Injectable} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {OwnerService} from "../owner/owner.service";
import {LogInOwnerDto} from "../owner/dto/log-in-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {LogInOwnerReturn} from "../interfaces/logInOwner";
import {OwnerSessionTokenService} from "../owner-session-token/owner-session-token.service";
import {LogInOwnerResponse} from "../interfaces/loginOwnerResponse";

import {Request} from "express";

@Injectable()
export class AuthService {

  constructor(
    @Inject(OwnerService) private ownerService: OwnerService,
    @Inject(OwnerSessionTokenService) private ownerSessionTokenService: OwnerSessionTokenService
  ) {
  }

  createOwner(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
    return this.ownerService.create(createOwnerDto)
  }

  async logIn(logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerResponse> {

    const owner = await this.ownerService.logIn(logInOwnerDto)

    if(owner){

      const ownerSessionToken = await this.ownerSessionTokenService.create(owner)

      //TOKEN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! wygenerowac
      // const ownerSessionToken =  //TODO
      // ownerSessionToken. // TODO cos nie łapie

      return{
        status: true,
        authToken: ownerSessionToken.id,
        ownerId: owner.id
      }

    }else{
      return {
        status: false,
        error: 'Logowanie nie powiodlo się'
      }
    }

  }
}
