import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule, TypeOrmModule.forRoot(typeOrmConfig), BoardModule, ListModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
