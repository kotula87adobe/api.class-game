import { Injectable } from '@nestjs/common';
import {CreateExerciseDto} from "./dto/create-exercise.dto";
import {RemoveExerciseDto} from "./dto/remove-exercise.dto";
import {Owner} from "../owner/entities/owner.entity";
import {Exercise} from "./entities/exercise.entity";
import {UpdateExerciseDto} from "./dto/update-exercise.dto";
import {CreateExerciseResponse} from "../interfaces/Exercise/createExerciseResponse";
import {RemoveExerciseResponse} from "../interfaces/Exercise/removeExerciseResponse";``
import {UpdateExerciseResponse} from "../interfaces/Exercise/updateExerciseResponse";

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

  async remove(removeExerciseDto:RemoveExerciseDto): Promise<RemoveExerciseResponse>{

    const exercise = await Exercise.findOne(removeExerciseDto.id)

    return {
      status: true,
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

}
