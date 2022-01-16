import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { TaskListDto } from './tasklist.dto';
import { TasklistService } from './tasklist.service';

@Controller('api/tasklist')
export class TasklistController {
    constructor(private taskListService: TasklistService){}

    @UseGuards(new JwtAuthGuard)
    @Post(':id')
    create(@Param('id')cardId: any, @Body() body: TaskListDto){
        return this.taskListService.create( cardId, body);
    }

    @UseGuards(new JwtAuthGuard)
    @Get('card/:id')
    getByCardId(@Param('id') cardId: any){
        return this.taskListService.getByCardId(cardId)
    }

    @UseGuards(new JwtAuthGuard)
    @Get(':id')
    get(@Param('id') taskListId: any ){
        return this.taskListService.get(taskListId)
           
    }
    

    
}
