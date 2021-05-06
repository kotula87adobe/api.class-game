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
import { SessionTokenModule } from './session-token/session-token.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    DashboardModule,
    UserModule,
    VisitModule,
    AnswerModule,
    OwnerModule,
    AuthModule,
    SessionTokenModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
