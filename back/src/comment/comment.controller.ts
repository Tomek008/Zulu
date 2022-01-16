import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import {Request } from 'express';

@Controller('api/comment')
export class CommentController {
    constructor( private commentService: CommentService){}

    @UseGuards(new JwtAuthGuard())
    @Post(':id')
    create(@Req() request: Request, @Param('id') listId: number, @Body() body: CommentDto){
        return this.commentService.create(request.headers.authorization, listId, body)
    }

    @UseGuards(new JwtAuthGuard())
    @Delete(':id')
    delete(@Req() request: Request, @Param('id') commentId){
        return this.commentService.delete(request.headers.authorization, commentId)
        
    }

    @UseGuards(new JwtAuthGuard())
    @Get(':id')
    get(@Param('id') commentId){
        return this.commentService.get(commentId)
    }
}
