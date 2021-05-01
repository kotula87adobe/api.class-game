import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {User} from './entities/user.entity'
import {Owner} from "../owner/entities/owner.entity";
import {CreateUserResponse} from "../interfaces/user";

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {

    const user = new User()

    const owner = await Owner.findOne(createUserDto.ownerId)
    user.owner = owner
    await user.save()

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
