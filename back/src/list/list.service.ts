import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardRepository } from 'src/board/board.repository';
import { ListDto } from './list.dto';
import { ListRepository } from './list.repository';
import { List } from './list.entity';
import { UserRepository } from 'src/auth/user.repository';
@Injectable()
export class ListService {
    constructor(private listRepository: ListRepository,
        private boardRepository: BoardRepository,
        private userRepository: UserRepository){}

    async delete(id: any) {
        const list = await this.listRepository.findOne({
            where:{ id },
            relations: ['author', 'board']
        });
        if( !list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        await this.listRepository.remove(list)
        const response: any = {...list};
        return response

    }
    async update(id: any, body: ListDto) {
        let list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author']
        })
        if( !list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        await this.listRepository.update({ id }, body)
        list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author']
        })

        const response: any = {...list};
        return response
    }

    async addList(userId: any, boardId: any, body: ListDto) {
        const board = await this.boardRepository.findOne({where: {id: boardId.id }});
        if(! board){
            throw new HttpException('Board not found', HttpStatus.NOT_FOUND);

        }
        const author = await this.userRepository.findOne({where: {id: userId}})
        if(!author){
            throw new HttpException('Author not found', HttpStatus.NOT_FOUND);

        }
        const list = await this.listRepository.create({
            ...body,
            board,
            author: author
        });
        await this.listRepository.save(list);
        const response: any = {... list}
        return response
    }

    
    async getListById(listId: any) {
        const id = listId.id
        const list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author']
        });
        if(!list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND)
        }
        const response: any = {... list}
        return response;
    }

    async getListByBoardId(boardId: number) {
        const lists = await this.listRepository.find({
            where: {board: {id: boardId}},
            relations: ['board', 'author']
        });
        
        const response: any = {... lists}
        return response;
    }
}
