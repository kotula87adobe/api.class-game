import {Inject, Injectable} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {OwnerService} from "../owner/owner.service";

@Injectable()
export class AuthService {

  constructor(
    @Inject(OwnerService) private ownerService: OwnerService
  ) {
  }

  createOwner(createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto)
  }

}
