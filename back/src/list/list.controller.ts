import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ListDto } from './list.dto';
import { ListService } from './list.service';
import { Request } from 'express';

@Controller('api/list')
export class ListController {
    constructor(private listService: ListService){}
    @UseGuards(new JwtAuthGuard)
    @Get('board/:id')
    async getListByBoardId(@Param('id') boardId: number){
        return this.listService.getListsByBoardId(boardId);

    }
    @UseGuards(new JwtAuthGuard)
    @Get(':id')
    async getListById(@Param() id: number){
        return this.listService.getListById(id);
    }
    @UseGuards(new JwtAuthGuard)
    @Post(':id')
    async addList(@Req() req: Request, @Param() id, @Body() body: ListDto){
        return this.listService.addList(req.headers.authorization, id, body)
    }

    @UseGuards(new JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id, @Body() body: ListDto){
        return this.listService.update(id, body)
    }

    @UseGuards(new JwtAuthGuard)
    @Delete(':id')
    async delete(@Req() request: Request, @Param('id') id){
        return this.listService.delete(request.headers.authorization ,id)
    }    
     
}
