import {Controller, Get, Post, Delete, Put, Patch, Body, Req} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/createOwner";
import {DashboardService} from "../dashboard/dashboard.service";
import {AuthService} from "./auth.service";
import {LogInOwnerReturn} from "../interfaces/logInOwner";
import {LogInOwnerDto} from "../owner/dto/log-in-owner.dto";
import {LogInOwnerResponse} from "../interfaces/loginOwnerResponse";

import { Request } from 'express';
import {LogOutResponse} from "../interfaces/logOut";

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

  @Post('/register')
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
  logOut(@Req() request: Request): Promise<LogOutResponse>{
    // zniszczyc sesje(Token)
    // token pobrac z Request Headers ??

    // console.log({query: request.query})
    console.log(request.headers.authorization)

    return this.authService.logOut(request)
  }

}
