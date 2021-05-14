import { forwardRef, Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import {UserModule} from "../user/user.module";
import {VisitModule} from "../visit/visit.module";
import {AnswerModule} from "../answer/answer.module";
import {OwnerModule} from "../owner/owner.module";
import {ExerciseModule} from "../exercise/exercise.module";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
    forwardRef(()=>AuthModule),
    forwardRef(()=>UserModule),
    forwardRef(()=>VisitModule),
    forwardRef(()=>AnswerModule),
    forwardRef(()=>OwnerModule),
    forwardRef(()=>ExerciseModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService]
})
export class DashboardModule {}
