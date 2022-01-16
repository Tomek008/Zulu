import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './element.entity';
import { TaskList } from 'src/tasklist/tasklist.entity';
import { TaskListRepository } from 'src/tasklist/tasklist.repository';
import { ElementRepository } from './element.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TaskList, Element, ElementRepository, TaskListRepository ])],
  providers: [ElementService],
  controllers: [ElementController]
})
export class ElementModule {}
