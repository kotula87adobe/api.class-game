import {Body, Inject, Injectable} from '@nestjs/common';

import {Request} from "express";

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
import {CreateUserResponse} from "../interfaces/createUser";
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {ExerciseService} from "../exercise/exercise.service";
import {CreateExerciseDto} from "../exercise/dto/create-exercise.dto";
import {CreateExerciseResponse} from "../interfaces/Exercise/createExerciseResponse";
import {AuthService} from "../auth/auth.service";
import {UpdateExerciseDto} from "../exercise/dto/update-exercise.dto";
import {UpdateExerciseResponse} from "../interfaces/Exercise/updateExerciseResponse";

@Injectable()
export class DashboardService {

  constructor(
    @Inject(AuthService) private authService: AuthService,
    @Inject(UserService) private userService: UserService,
    @Inject(VisitService) private visitService: VisitService,
    @Inject(AnswerService) private answerService: AnswerService,
    @Inject(OwnerService) private ownerService: OwnerService,
    @Inject(ExerciseService) private exerciseService: ExerciseService,
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

  // Exercise

  async createExercise(createExerciseDto: CreateExerciseDto, request: Request): Promise<CreateExerciseResponse> {

    const token = request.headers.authorization ? request.headers.authorization : ''
    // console.log({token})
    const owner = await this.ownerService.findOne(createExerciseDto.ownerId)
    const isOwnerLogged = await this.authService.checkIfOwnerIsLogged(token, owner)

    // @ts-ignore
    if(isOwnerLogged){
      const exercise = await this.exerciseService.create(createExerciseDto, owner)
      return {
        status: true,
        // @ts-ignore
        url: exercise.url
      }
    }else{
      return {
        status: false,
        msg: 'Nie jestes zalogowany'
      }
    }

  }

  async updateExercise(id: string, updateExerciseDto: UpdateExerciseDto, request: Request): Promise<UpdateExerciseResponse>{
    const token = request.headers.authorization ? request.headers.authorization : ''
    const owner = await this.ownerService.findOne(updateExerciseDto.ownerId)
    const isOwnerLogged = await this.authService.checkIfOwnerIsLogged(token, owner)

    // @ts-ignore
    if(isOwnerLogged){
      const exercise = await this.exerciseService.findOne(id)
      exercise.url = updateExerciseDto.url
      await exercise.save()
      return {
        status: true,
        // @ts-ignore
        url: exercise.url
      }
    }else{
      return {
        status: false,
        msg: 'Nie jestes zalogowany'
      }
    }
  }

}
