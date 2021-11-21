import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListDto } from './list.dto';
import { ListService } from './list.service';

@Controller('api/list')
export class ListController {
    constructor(private listService: ListService){}

    @Get('board/:id')
    async getListByBoardId(@Param('id') boardId: number){
        return this.listService.getListByBoardId(boardId);

    }

    @Get(':id')
    async getListById(@Param() id: number){
        return this.listService.getListById(id);
    }

    @Post(':id')
    async addList(@Param() boardId, @Body() body: ListDto){
        return this.listService.addList(boardId, body)
    }

    @Put(':id')
    async update(@Param('id') id, @Body() body: ListDto){
        return this.listService.update(id, body)
    }

    @Delete(':id')
    async delete(@Param('id') id){
        return this.listService.delete(id)
    }    
     
}
