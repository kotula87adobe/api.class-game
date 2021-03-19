import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateVisitDto} from "../visit/dto/create-visit.dto";
import {CreateAnswerDto} from "../answer/dto/create-answer.dto";
import {Visit} from "../visit/entities/visit.entity";
import {User} from "../user/entities/user.entity";
import {Answer} from "../answer/entities/answer.entity";

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/user/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.dashboardService.createUser(createUserDto);
  }

  @Post('/visit/')
  createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.dashboardService.createVisit(createVisitDto);
  }

  @Post('/answer/')
  createAnswer(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.dashboardService.createAnswer(createAnswerDto);
  }

}
