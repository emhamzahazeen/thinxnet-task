import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';
import { DomainService } from '../domain/domain.service';

describe('AppController', () => {
  let appController: ApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [DomainService],
    }).compile();

    appController = app.get<ApiController>(ApiController);
  });

  describe('root', () => {
    it('should return "live!"', () => {
      expect(appController.checkHealth()).toBe('live!');
    });
  });
});
