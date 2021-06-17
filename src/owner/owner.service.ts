import {Injectable} from '@nestjs/common';
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {CreateOwnerDto, CreateOwnerDtoDtoProperties} from "./dto/create-owner.dto";
import {Owner} from "./entities/owner.entity";
import {LogInOwnerReturn} from "../interfaces/logInOwner";
import {LogInOwnerDto} from "./dto/log-in-owner.dto";
import {User} from "../user/entities/user.entity";
import {AssignExerciseDtoProperties} from "../exercise/dto/assign-exercise.dto";
import {formValidate} from "../dashboard/dashboard.service";

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

  validateName(name: string): string | boolean {
    if(name.length<3){
      return 'Name must be minimum 3 sign long'
    }else {
      return false
    }
  }

  async findOne(id: string): Promise<Owner>{
    const owner = await Owner.findOne(id)
    return owner
  }

  async findOneWithRelations(id: string, relations: string[]): Promise<Owner>{
    const owner = await Owner.findOne({where: {  id}, relations: [...relations]});
    return owner
  }

  async create(createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {

    const isFormValid = formValidate(createOwnerDto, CreateOwnerDtoDtoProperties)

    if(!isFormValid){
      return {
        error: 'Nie przesłano wszystkich pol formularza'
      }
    }

    const newName = createOwnerDto.name.toString();
    const isNameValid = this.validateName(newName);
    if(isNameValid){
      return {
        error: isNameValid
      }
    }

    const newPassword = createOwnerDto.password.toString()
    const isPasswordValid = this.validatePassword(newPassword)
    if(isPasswordValid){
      return {
        error: isPasswordValid
      }
    }

    if(createOwnerDto.name){
      const userExist = await Owner.findOne({name: createOwnerDto.name})
      if(userExist){
        return {
          error: 'User with this name/nick exist!'
        }
      }
    }

    const owner = new Owner();
    owner.name = createOwnerDto.name
    owner.password = this.hashPassword(newPassword)

    // const compareTest = bcrypt.compareSync(newPassword, hash); // true
    // console.log({compareTest})

    await owner.save()

    return {
      error: false,
      id: owner.id,
      name: owner.name,
      createdAt: owner.createdAt,
    }
  }

  async logIn(logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerReturn> {

    const owner = await Owner.findOne({
      name: logInOwnerDto.name,
    })

    console.log({logInOwnerDto})

    if(this.checkPassword(logInOwnerDto.password, owner.password)) {
      return owner
    }else {
      return false
    }

  }
}
