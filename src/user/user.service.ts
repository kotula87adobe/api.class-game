import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {User} from './entities/user.entity'
import {Owner} from "../owner/entities/owner.entity";
import {CreateUserResponse} from "../interfaces/createUser";

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponse> {

    const user = new User()

    if(!!createUserDto.ownerId) {
      var owner = await Owner.findOne(createUserDto.ownerId)
      if(owner){
        user.owner = owner
      }
    }

    if(!!createUserDto.name && !!createUserDto.ownerId){

      const userExist = await User.findOne({
        name: createUserDto.name,
        // owner: owner //TODO
      })
      if(!!userExist){
        return {
          status: false,
          msg: 'Uczeń o takim imieniu już istnieje.'
        }

      }

      user.name = createUserDto.name
    }

    await user.save()

    return {
      status: true,
      id: user.id,
      name: !!createUserDto.name ? createUserDto.name : '',
      ownerId: !!createUserDto.ownerId ? createUserDto.ownerId : null,
      createdAt: user.createdAt
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string): Promise<User> {
    const user = await User.findOne(id,{relations: ['exercises']});
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
