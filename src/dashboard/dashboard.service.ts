import {Body, Inject, Injectable} from '@nestjs/common';

import {UserService} from "../user/user.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@Injectable()
export class DashboardService {

  constructor(
    @Inject(UserService) private userService: UserService
  ) {

  }

  createUser(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

}
