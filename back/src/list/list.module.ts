import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { Board } from 'src/board/board.entity';
import { BoardRepository } from 'src/board/board.repository';
import { Card } from 'src/card/card.entity';
import { CardRepository } from 'src/card/card.repository';
import { ListController } from './list.controller';
import { List } from './list.entity';
import { ListRepository } from './list.repository';
import { ListService } from './list.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board ,ListRepository, BoardRepository, UserRepository, Card, CardRepository])],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule {}
