import { Module } from '@nestjs/common';
import { SessionTokenService } from './session-token.service';

@Module({
  providers: [SessionTokenService]
})
export class SessionTokenModule {}
