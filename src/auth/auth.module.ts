import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {OwnerModule} from "../owner/owner.module";
import {DashboardModule} from "../dashboard/dashboard.module";
import {OwnerSessionTokenModule} from "../owner-session-token/owner-session-token.module";

@Module({
  imports: [
    forwardRef(()=>OwnerModule),
    forwardRef(()=>DashboardModule),
    forwardRef(()=>OwnerSessionTokenModule),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
