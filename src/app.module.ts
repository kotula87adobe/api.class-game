import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserModule } from './user/user.module';
import { VisitModule } from './visit/visit.module';
import { AnswerModule } from './answer/answer.module';
import { OwnerModule } from './owner/owner.module';
import { AuthModule } from './auth/auth.module';
import { OwnerSessionTokenModule } from './owner-session-token/owner-session-token.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DashboardModule,
    UserModule,
    VisitModule,
    AnswerModule,
    OwnerModule,
    AuthModule,
    OwnerSessionTokenModule,
    ExerciseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
