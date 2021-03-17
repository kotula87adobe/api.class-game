import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {CreateUserDto} from "../user/dto/create-user.dto";

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post('/user/')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.dashboardService.createUser(createUserDto);
  }

}
