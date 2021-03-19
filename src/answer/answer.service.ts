import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import {Answer} from "./entities/answer.entity";
import {Visit} from "../visit/entities/visit.entity";

@Injectable()
export class AnswerService {
  async create(createAnswerDto: CreateAnswerDto) {

    const answer = new Answer();
    answer.text = createAnswerDto.text;
    answer.category = createAnswerDto.category;
    answer.subcategory = createAnswerDto.subcategory;
    answer.answer = createAnswerDto.answer;
    answer.isCorrect = createAnswerDto.isCorrect;

    const visit = await Visit.findOne(createAnswerDto.visitId)

    answer.visit = visit
    await answer.save()

    return answer;
  }

  // findAll() {
  //   return `This action returns all answer`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} answer`;
  // }
  //
  // update(id: number, updateAnswerDto: UpdateAnswerDto) {
  //   return `This action updates a #${id} answer`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} answer`;
  // }
}
