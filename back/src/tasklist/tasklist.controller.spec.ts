import { Test, TestingModule } from '@nestjs/testing';
import { TasklistController } from './tasklist.controller';

describe('TasklistController', () => {
  let controller: TasklistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasklistController],
    }).compile();

    controller = module.get<TasklistController>(TasklistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
