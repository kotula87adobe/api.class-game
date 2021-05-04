import {Controller, Get, Post, Delete, Put, Patch, Body} from '@nestjs/common';
import {CreateOwnerDto} from "../owner/dto/create-owner.dto";
import {CreateOwnerResponse} from "../interfaces/owner";
import {DashboardService} from "../dashboard/dashboard.service";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Get('/')
  testUrl(){
    return '<h1>AUTH</h1>'
  }

  @Post('/create')
  createOwner(@Body() createOwnerDto: CreateOwnerDto): Promise<CreateOwnerResponse> {
    return this.authService.createOwner(createOwnerDto)
  }

}
