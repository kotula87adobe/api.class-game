import { Injectable } from '@nestjs/common';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import {Visit} from "./entities/visit.entity";
import {User} from "../user/entities/user.entity";

@Injectable()
export class VisitService {

  async create(createVisitDto: CreateVisitDto): Promise<Visit> {

    const user = await User.findOne(createVisitDto.userId)

    const visit = new Visit();
    visit.user = user
    await visit.save()

    return visit
  }

}
