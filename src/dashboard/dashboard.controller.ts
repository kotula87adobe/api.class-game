import {Controller, Get, Post, Body, Patch, Param, Delete, Req} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {CreateUserDto} from "../user/dto/create-user.dto";
import {CreateVisitDto} from "../visit/dto/create-visit.dto";
import {CreateAnswerDto} from "../answer/dto/create-answer.dto";
import {Visit} from "../visit/entities/visit.entity";
import {User} from "../user/entities/user.entity";
import {Answer} from "../answer/entities/answer.entity";
import {CreateUserResponse} from "../interfaces/createUser";
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {CreateExerciseDto} from "../exercise/dto/create-exercise.dto";
import {Request} from "express";
import {CreateExerciseResponse} from "../interfaces/Exercise/createExerciseResponse";
import {UpdateExerciseDto} from "../exercise/dto/update-exercise.dto";
import {UpdateExerciseResponse} from "../interfaces/Exercise/updateExerciseResponse";
import {RemoveExerciseDto} from "../exercise/dto/remove-exercise.dto";

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Owner

  // @Post('/owner')
  // createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
  //   return this.dashboardService.createOwner(createOwnerDto)
  // }


  // User

  @Post('/user/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.dashboardService.createUser(createUserDto);
  }

  // TODO updateUser
  // TODO removeUser

  @Post('/visit/')
  createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.dashboardService.createVisit(createVisitDto);
  }

  @Post('/answer/')
  createAnswer(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.dashboardService.createAnswer(createAnswerDto);
  }

  // Exercises

  @Post('/exercise')
  createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
    @Req() request: Request): Promise<CreateExerciseResponse>{
    return this.dashboardService.createExercise(createExerciseDto, request)
  }

  @Post('/exercise/:id')
  updateExercise(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Req() request: Request
  ): Promise<UpdateExerciseResponse>{
    return this.dashboardService.updateExercise(id, updateExerciseDto, request)
  }

  @Post('/exercise/remove/:id')
  removeExercise(
    @Param('id') id: string,
    @Body() removeExerciseDto: RemoveExerciseDto,
    @Req() request: Request
  ){
    return this.dashboardService.removeExercise(id, removeExerciseDto, request)
  }



  // assignExercise() //TODO !!!!!!!!!!!!!!!!!!!
  // nowe entity id|exerciseId|userId|

  //getUserExercises()

}
