import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from 'src/list/list.entity';
import { ListRepository } from 'src/list/list.repository';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardRepository } from './card.repository';
import { CardService } from './card.service';

@Module({
  imports: [TypeOrmModule.forFeature([List, ListRepository, Card, CardRepository])],
  controllers: [CardController],
  providers: [CardService]
})
export class CardModule {}
