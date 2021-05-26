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
import {AssignExerciseDto} from "../exercise/dto/assign-exercise.dto";
import {AssignExerciseResponse, AssignExerciseResponseAll} from "../interfaces/Exercise/assignExerciseResponse";
import {UnsignExerciseResponse} from "../interfaces/Exercise/unsignExerciseResponse";
import {UnsignExerciseDto} from "../exercise/dto/unsign-exercise.dto";

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  // Owner

  // @Post('/owner')
  // createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
  //   return this.dashboardService.createOwner(createOwnerDto)
  // }


  // User

  @Post('/users/')
  createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponse> {
    return this.dashboardService.createUser(createUserDto);
  }

  // TODO updateUser
  // TODO removeUser

  @Post('/visits/')
  createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    return this.dashboardService.createVisit(createVisitDto);
  }

  @Post('/answers/')
  createAnswer(@Body() createAnswerDto: CreateAnswerDto): Promise<Answer> {
    return this.dashboardService.createAnswer(createAnswerDto);
  }

  // Exercises

  @Post('/exercises')
  createExercise(
    @Body() createExerciseDto: CreateExerciseDto,
    @Req() request: Request): Promise<CreateExerciseResponse>{
    return this.dashboardService.createExercise(createExerciseDto, request)
  }

  @Post('/exercises/:id')
  updateExercise(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Req() request: Request
  ): Promise<UpdateExerciseResponse>{
    return this.dashboardService.updateExercise(id, updateExerciseDto, request)
  }

  @Post('/exercises/remove/:id')
  removeExercise(
    @Param('id') id: string,
    @Body() removeExerciseDto: RemoveExerciseDto,
    @Req() request: Request
  ){
    return this.dashboardService.removeExercise(id, removeExerciseDto, request)
  }

  @Post('/exercises/assign/:exerciseId')
  assignExercise(
    @Param('exerciseId') exerciseId:string,
    @Body() assignExerciseDto:AssignExerciseDto,
    @Req() request: Request
  ): Promise<AssignExerciseResponse>{
    return this.dashboardService.assignExercise(exerciseId, assignExerciseDto, request)
  }

//dla wszystkich userow danego Ownera,
  // sprawdzic czy sie nie dubluje,
  // generalnie wywoalnie kilkukrotne metody this.dashboardService.assignExercise, choc nie bedzie to zbyt optymalne
  @Post('/exercises/assign/:exerciseId/all')
  assignToAllUsers(
    @Param('exerciseId') exerciseId: string,
    @Body() assignExerciseDto: AssignExerciseDto,
    @Req() request: Request
  ): Promise<AssignExerciseResponseAll> {
    return this.dashboardService.assignExerciseAll(exerciseId, assignExerciseDto, request)
  }

  @Post('/exercises/unsign/:exerciseId')
  unsignExercise(
    @Param('exerciseId') exerciseId: string,
    @Body() unsignExerciseDto: UnsignExerciseDto,
    @Req() request: Request
  ): Promise<UnsignExerciseResponse> {
    return this.dashboardService.unsignExercise(exerciseId, unsignExerciseDto, request)
  }

  // getUserExercises(){} //@Get //TODO
  //@Post
  // unsignAllExercise(){} //@Post


}
