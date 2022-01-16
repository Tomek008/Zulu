import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';
import { CardModule } from './card/card.module';
import { CommentModule } from './comment/comment.module';
import { TasklistModule } from './tasklist/tasklist.module';
import { ElementModule } from './element/element.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule, TypeOrmModule.forRoot(typeOrmConfig), BoardModule, ListModule, CardModule, CommentModule, TasklistModule, ElementModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
