import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { BoardService } from './board.service';
import { Board } from './board.entity';
import { UserRepository } from 'src/auth/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository, UserRepository])],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
