import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { ListRepository } from './list.repository';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board ,ListRepository, BoardRepository])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
