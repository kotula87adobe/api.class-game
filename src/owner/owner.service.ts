import { Injectable } from '@nestjs/common';

const bcrypt = require('bcrypt');

import {CreateOwnerResponse} from "../interfaces/owner";
import {CreateOwnerDto} from "./dto/create-owner.dto";
import {Owner} from "./entities/owner.entity";


@Injectable()
export class OwnerService {

  validatePassword(pass: string): string  | boolean{
      if(pass.length<5){
        return 'Password must be minimum 5 sign long'
      }
      if(!pass.match(/[A-Z]/g)){
        return 'Password must contain at last 1 upper later'
      }
      if(!pass.match(/[a-z]/g)){
        return 'Password must contain at last 1 small later'
      }
      else{
        return false
      }
  }

  async create(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {

    const newPassword = createOwnerDto.password.toString()
    const isPasswordValid = this.validatePassword(newPassword)
    if(isPasswordValid){
      return {
        error: isPasswordValid
      }
    }

    const userExist = await Owner.findOne({email: createOwnerDto.email})
    if(userExist){
      return {
        error: 'User with this email exist!'
      }
    }

    const owner = new Owner();
    owner.email = createOwnerDto.email

    const saltRounds = 10;

    const hash = bcrypt.hashSync(newPassword, saltRounds);
    owner.password = hash

    // const compareTest = bcrypt.compareSync(newPassword, hash); // true
    // console.log({compareTest})

    await owner.save()

    return {
      id: owner.id,
      email: owner.email,
      createdAt: owner.createdAt,
    }
  }

}
