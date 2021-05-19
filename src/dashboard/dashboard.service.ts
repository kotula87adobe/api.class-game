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
import {RemoveExerciseResponse} from "../interfaces/Exercise/removeExerciseResponse";
import {RemoveExerciseDto} from "../exercise/dto/remove-exercise.dto";
import {AssignExerciseDto, AssignExerciseDtoProperties} from "../exercise/dto/assign-exercise.dto";
import {AssignExerciseResponse} from "../interfaces/Exercise/assignExerciseResponse";

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
 //TODO chyba cos z data jest nie tak - createdAt, updatedAt -> updatedAt: Invalid Date
  async createExercise(createExerciseDto: CreateExerciseDto, request: Request): Promise<CreateExerciseResponse> {

    const owner = await this.ownerService.findOne(createExerciseDto.ownerId)
    const isOwnerLogged = await this.authService.checkIfOwnerIsLogged(request, owner)

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
    const owner = await this.ownerService.findOne(updateExerciseDto.ownerId)
    const isOwnerLogged = await this.authService.checkIfOwnerIsLogged(request, owner)

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

  async removeExercise(id: string, removeExerciseDto: RemoveExerciseDto, request: Request): Promise<RemoveExerciseResponse> {
    //TODO if isLogged

    const owner = await this.ownerService.findOne(removeExerciseDto.ownerId)
    const isOwnerLogged = await this.authService.checkIfOwnerIsLogged(request, owner)

    return isOwnerLogged ?  this.exerciseService.remove(id) : {status: false, msg: 'Musisz byc zalogowany'}
  }

  async assignExercise(exerciseId:string, assignExerciseDto:AssignExerciseDto, request: Request): Promise<AssignExerciseResponse> {

    // TODO jakas walidacja czy przeslano wszystkie pola formularza - zrobic z tego funkkcje sprawdzajaca klucze po petli z DTO
    // Zwracac nazwe pola ktorego nie przeslano
    // Mozna sprawdzac tez typy i walidowac na tym etapie
    // Podchodzi to zadanie pod te interceptory !?!
    // //TODO

    //****************************
    function compareKeys(form, dto) {
      var aKeys = Object.keys(form).sort();
      var bKeys = Object.keys(dto).sort();
      console.log(JSON.stringify(aKeys))
      console.log(JSON.stringify(bKeys))
      return JSON.stringify(aKeys) === JSON.stringify(bKeys);
    }

    const isFormValid = compareKeys(assignExerciseDto, AssignExerciseDtoProperties)

    if(!isFormValid){
      return {status: false,msg: 'Nie przesłano wszystkich pol formularza'}
    }
    //*****************************

    const owner = await this.ownerService.findOne(assignExerciseDto.ownerId)

    if(!owner){
      return {status: false,msg: 'Musisz być zalogowany!'}
    }

    const isLogged = await this.authService.checkIfOwnerIsLogged(request, owner)

    if(!isLogged){
      return {status: false,msg: 'Musisz być zalogowany!'}
    }

    const exercise = await this.exerciseService.findOne(exerciseId)

    if(!exercise){
      return {status: false,msg: 'Nie znaleziono zadania!'}
    }

    const user = await this.userService.findOne(assignExerciseDto.userId)

    if(!user){
      return {status: false,msg: 'Nie ma uzytlkownika ktoremu probujesz przypisac ti zadanie!'}
    }

    return this.exerciseService.assignExercise(exercise, user)
  }

}
