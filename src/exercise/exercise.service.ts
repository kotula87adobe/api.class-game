import { Injectable } from '@nestjs/common';
import {CreateExerciseDto} from "./dto/create-exercise.dto";
import {RemoveExerciseDto} from "./dto/remove-exercise.dto";
import {Owner} from "../owner/entities/owner.entity";
import {Exercise} from "./entities/exercise.entity";
import {UpdateExerciseDto} from "./dto/update-exercise.dto";
import {CreateExerciseResponse} from "../interfaces/Exercise/createExerciseResponse";
import {RemoveExerciseResponse} from "../interfaces/Exercise/removeExerciseResponse";``
import {UpdateExerciseResponse} from "../interfaces/Exercise/updateExerciseResponse";
import {AssignExerciseDto} from "./dto/assign-exercise.dto";
import {User} from "../user/entities/user.entity";
import {AssignExerciseResponse} from "../interfaces/Exercise/assignExerciseResponse";

@Injectable()
export class ExerciseService {

  async create(createExerciseDto: CreateExerciseDto, owner: Owner): Promise<CreateExerciseResponse>{

    const exercise = new Exercise()
    exercise.owner = owner
    exercise.url = createExerciseDto.url
    await exercise.save()

    return {
      status: true,
      url: exercise.url
    }
  }

  async remove(id: string,): Promise<RemoveExerciseResponse>{

    const exercise = await Exercise.findOne(id)
    if(exercise) await exercise.remove()

    if(exercise){
      return {status: !!exercise}
    }else{
      return {status: !!exercise, msg: "Takie zadanie juz nie istnieje"}
    }
  }

  async update(updateExerciseDto:UpdateExerciseDto, owner: Owner): Promise<UpdateExerciseResponse>{
    const exercise = await Exercise.findOne(updateExerciseDto.id)
    exercise.url = updateExerciseDto.url
    exercise.updatedAt = new Date()
    await exercise.save()

    return {
      status: true,
      url: updateExerciseDto.url
    }
  }

  async findOne(id: string): Promise<Exercise> {
    const exercise = await Exercise.findOne(id)
    return exercise;
  }

  async assignExercise(exercise: Exercise, user: User): Promise<AssignExerciseResponse> {

    // nie sprawdza duplikatow i zastepuje a nie dodaje w tabeli //todo!!!!!!!!!!
    console.log({user})
    let userExercises = await user.exercises;

    userExercises = userExercises ? userExercises : []
    let exerciseUsers = await exercise.users;
    exerciseUsers = exerciseUsers ? exerciseUsers : []


    const checkForDuplicate = userExercises.length && userExercises.filter(userExercise => userExercise.id === exercise.id)
    console.log({checkForDuplicate})
    // console.log({user})
    // console.log({userExercises})

    if(checkForDuplicate.length){
      return {status: false, msg: 'Uczen ma juz przypisane to zadanie'}
    }else{
      userExercises.push(exercise)
      await user.save()
      exerciseUsers.push(user)
      await exercise.save()

      return {status: true, exerciseId: exercise.id, userId: user.id, url: exercise.url}

    }


  }

}
