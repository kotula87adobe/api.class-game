import { forwardRef, Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import {UserModule} from "../user/user.module";
import {VisitModule} from "../visit/visit.module";

@Module({
  imports: [
    forwardRef(()=>UserModule),
    forwardRef(()=>VisitModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
