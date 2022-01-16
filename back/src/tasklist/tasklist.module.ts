import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/card/card.entity';
import { CardRepository } from 'src/card/card.repository';
import { TasklistController } from './tasklist.controller';
import { TaskList } from './tasklist.entity';
import { TaskListRepository } from './tasklist.repository';
import { TasklistService } from './tasklist.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, Card, CardRepository, TaskListRepository ])],
  controllers: [TasklistController],
  providers: [TasklistService]
})
export class TasklistModule {}
