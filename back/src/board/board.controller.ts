import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './board.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { Request } from 'express';
@Controller('api/board')
export class BoardController {
    constructor(private boardService: BoardService){}

    @UseGuards(new JwtAuthGuard())
    @Get()
    showAll(@Req() request: Request){
        return this.boardService.showAll(request.headers.authorization);
    }

    @UseGuards(new JwtAuthGuard)
    @Post()
    create(@Req() request: Request, @Body() body: BoardDto){
        return this.boardService.create(request.headers.authorization, body);
    }

    @UseGuards(new JwtAuthGuard())
    @Get(':id')
    show(@Param('id') id){
        return this.boardService.show(id);
    }

    @UseGuards(new JwtAuthGuard())
    @Put(':id')
    update(@Param('id') id, @Body() body: Partial<BoardDto>){
        return this.boardService.update(id, body);
    }

    @UseGuards(new JwtAuthGuard())
    @Delete(':id')
    delete(@Param('id') id: number, @Req() request: Request){
        return this.boardService.delete(id, request.headers.authorization);
    }
}
