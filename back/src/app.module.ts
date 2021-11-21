import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [HttpModule, AuthModule, UsersModule, TypeOrmModule.forRoot(typeOrmConfig), BoardModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
