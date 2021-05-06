import { Test, TestingModule } from '@nestjs/testing';
import { OwnerSessionTokenService } from './owner-session-token.service';

describe('OwnerSessionTokenService', () => {
  let service: OwnerSessionTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerSessionTokenService],
    }).compile();

    service = module.get<OwnerSessionTokenService>(OwnerSessionTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
