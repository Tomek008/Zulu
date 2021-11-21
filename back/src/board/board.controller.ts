import { Body, Controller, Delete, Get, Logger, Param, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './board.dto';
@Controller('api/board')
export class BoardController {
    constructor(private boardService: BoardService){}

    @Get()
    showAll(@Param('id') user){
        return this.boardService.showAll(user);
    }

    @Post()
    async create(@Param('id') user, @Body() body: BoardDto){
        Logger.log(body)
        return this.boardService.create(user, body);
    }

    @Get(':id')
    show(@Param('id') id: number, @Param('id') user){
        return this.boardService.show(id, user);
    }

    @Put(':id')
    update(@Param('id') id: string, @Param('id') user, @Body() body: Partial<BoardDto>){
        return this.boardService.update(id, user, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number, @Param('id') user){
        return this.boardService.delete(id, user);
    }
}
