import { Module } from '@nestjs/common';
import { OwnerSessionTokenService } from './owner-session-token.service';

@Module({
  providers: [OwnerSessionTokenService],
  exports: [OwnerSessionTokenService]
})
export class OwnerSessionTokenModule {}
