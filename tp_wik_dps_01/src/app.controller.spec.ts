import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('ping', () => {
    it('should return request headers', () => {
      const req = {
        headers: {
          host: 'localhost:3000',
        },
      };

      expect(appController.ping(req as any)).toEqual(req.headers);
    });
  });
});
