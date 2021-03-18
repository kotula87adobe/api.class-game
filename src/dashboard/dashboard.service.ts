import {Body, Inject, Injectable} from '@nestjs/common';

import {UserService} from "../user/user.service";
import {VisitService} from "../visit/visit.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateVisitDto} from "../visit/dto/create-visit.dto";
import {Visit} from "../visit/entities/visit.entity";
import {User} from "../user/entities/user.entity";

@Injectable()
export class DashboardService {

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(VisitService) private visitService: VisitService,
  ) {

  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  createVisit(createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.create(createVisitDto)
  }

}
