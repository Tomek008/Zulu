import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { Board } from './board.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
