import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { ElementDto } from './element.dto';
import { ElementService } from './element.service';

@Controller('api/element')
export class ElementController {
    constructor(private elementService: ElementService){}

    @UseGuards(new JwtAuthGuard)
    @Post(':id')
    create(@Param('id')taskListId: any, @Body() body: ElementDto){
        return this.elementService.create( taskListId, body);
    }

    @UseGuards(new JwtAuthGuard)
    @Get('tasklist/:id')
    getByTaskListId(@Param('id') taskListId: any){
        return this.elementService.getByTaskListId(taskListId)
    }

    @UseGuards(new JwtAuthGuard)
    @Get(":id")
    get(@Param('id') id: any){
        return this.elementService.get(id)
    }

    @UseGuards(new JwtAuthGuard)
    @Put(":id")
    toggle(@Param('id') id: any){
        return this.elementService.toggle(id)
    }
}
