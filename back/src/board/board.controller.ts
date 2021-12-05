import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './board.dto';
@Controller('api/board')
export class BoardController {
    constructor(private boardService: BoardService){}

    @Get()
    showAll(@Query('id') id){
        return this.boardService.showAll(id);
    }

    @Post()
    async create(@Query('id') user, @Body() body: BoardDto){
        return this.boardService.create(user, body);
    }

    @Get(':id')
    show(@Param('id') id){
        return this.boardService.show(id);
    }

    @Put(':id')
    update(@Param('id') id, @Body() body: Partial<BoardDto>){
        return this.boardService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.boardService.delete(id);
    }
}
