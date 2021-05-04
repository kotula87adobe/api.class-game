import {Body, Inject, Injectable} from '@nestjs/common';

import {UserService} from "../user/user.service";
import {VisitService} from "../visit/visit.service";
import {AnswerService} from "../answer/answer.service";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateVisitDto} from "../visit/dto/create-visit.dto";
import {CreateAnswerDto} from "../answer/dto/create-answer.dto";
import {Visit} from "../visit/entities/visit.entity";
import {User} from "../user/entities/user.entity";
import {Answer} from "../answer/entities/answer.entity";
import {OwnerService} from "../owner/owner.service";
import {CreateUserResponse} from "../interfaces/user";
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/owner";

@Injectable()
export class DashboardService {

  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(VisitService) private visitService: VisitService,
    @Inject(AnswerService) private answerService: AnswerService,
    @Inject(OwnerService) private ownerService: OwnerService,
  ) {}

  // Owner

  createOwner(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse>{
    return this.ownerService.create(createOwnerDto)
  }

  // User

  createUser(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.create(createUserDto);
  }

  createVisit(createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.visitService.create(createVisitDto)
  }

  createAnswer(createAnswerDto: CreateAnswerDto): Promise<Answer>{
    return this.answerService.create(createAnswerDto)
  }

}
