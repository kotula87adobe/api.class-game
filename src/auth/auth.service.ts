import {Inject, Injectable} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {OwnerService} from "../owner/owner.service";
import {LogInOwnerDto} from "../owner/dto/log-in-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {LogInOwnerResponse} from "../interfaces/logInOwner";

@Injectable()
export class AuthService {

  constructor(
    @Inject(OwnerService) private ownerService: OwnerService
  ) {
  }

  createOwner(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
    return this.ownerService.create(createOwnerDto)
  }

  logIn(logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerResponse> {
    return this.ownerService.logIn(logInOwnerDto)
  }
}
