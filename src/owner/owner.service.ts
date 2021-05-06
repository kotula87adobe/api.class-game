import {Injectable} from '@nestjs/common';
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {CreateOwnerDto} from "./dto/create-owner.dto";
import {Owner} from "./entities/owner.entity";
import {LogInOwnerResponse} from "../interfaces/logInOwner";
import {LogInOwnerDto} from "./dto/log-in-owner.dto";

const bcrypt = require('bcrypt');


@Injectable()
export class OwnerService {

  hashPassword(password): string{

    const saltRounds = 10;

    const hash = bcrypt.hashSync(password, saltRounds);

    return hash

  }

  checkPassword(password, hash){
    const compareTest = bcrypt.compareSync(password, hash); // true
    return compareTest
  }

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
    owner.password = this.hashPassword(newPassword)

    // const compareTest = bcrypt.compareSync(newPassword, hash); // true
    // console.log({compareTest})

    await owner.save()

    return {
      id: owner.id,
      email: owner.email,
      createdAt: owner.createdAt,
    }
  }

  async logIn(logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerResponse> {

    // const authToken = new  //TODO

    const owner = await Owner.findOne({
      email: logInOwnerDto.email,
    })


    if(this.checkPassword(logInOwnerDto.password,owner.password)){
      return {
        status: true,
        ownerId: owner.id,
        authToken: 'TODO'
      }
    }else{
      return {status: false, error: 'Wrong password'}
    }

    return {status: true, authToken: '12122', ownerId: 'dscds'};

  }
}
