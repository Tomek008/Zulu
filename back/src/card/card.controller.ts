import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CardDescription, CardDto } from './card.dto';
import { CardService } from './card.service';

@Controller('api/card')
export class CardController {
    constructor(private cardService: CardService){}

    @UseGuards(new JwtAuthGuard)
    @Get(':id')
    async getCardById(@Param('id') cardId: number){
        return this.cardService.get(cardId);
    }

    @UseGuards(new JwtAuthGuard)
    @Post(':id')
    async create(@Param('id') listId: number,  @Body() body: CardDto){
        return this.cardService.create(listId, body)

    }

    @UseGuards(new JwtAuthGuard)
    @Put(':id')
    async setDescription(@Param('id') cardId: number, @Body() body: CardDescription){
        return this.cardService.setDescription(cardId, body)
    }

    @UseGuards(new JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') cardId: number){
        return this.cardService.delete(cardId)
    }

    
}