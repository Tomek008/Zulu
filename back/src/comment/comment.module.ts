import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/user.repository';
import { User } from 'src/auth/users.entity';
import { Card } from 'src/card/card.entity';
import { CardRepository } from 'src/card/card.repository';
import { List } from 'src/list/list.entity';
import { ListRepository } from 'src/list/list.repository';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Card, CommentRepository, Comment, User, UserRepository, ListRepository, List, CardRepository])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
