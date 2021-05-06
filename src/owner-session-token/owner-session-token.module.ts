import { Module } from '@nestjs/common';
import { OwnerSessionTokenService } from './owner-session-token.service';

@Module({
  providers: [OwnerSessionTokenService]
})
export class OwnerSessionTokenModule {}
