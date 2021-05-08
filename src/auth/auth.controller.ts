import {Controller, Get, Post, Delete, Put, Patch, Body, Req} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {DashboardService} from "../dashboard/dashboard.service";
import {AuthService} from "./auth.service";
import {LogInOwnerReturn} from "../interfaces/logInOwner";
import {LogInOwnerDto} from "../owner/dto/log-in-owner.dto";
import {LogInOwnerResponse} from "../interfaces/loginOwnerResponse";

import { Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Get('/')
  testUrl(){
    return '<h1>AUTH</h1>'
  }

  @Post('/create')
  //Dodatkowo utworzyc sesje
  createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
    return this.authService.createOwner(createOwnerDto)
  }

  @Post('/login')
  logIn(@Body() logInOwnerDto: LogInOwnerDto): Promise<LogInOwnerResponse>{
    //utworzyc sesje(Token)

    return this.authService.logIn(logInOwnerDto)
  }

  @Post('/logout')
  logOut(@Req() request: Request){
    //zniszczyc sesje(Token)
  }

}
