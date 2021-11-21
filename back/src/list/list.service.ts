import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardRepository } from 'src/board/board.repository';
import { ListDto } from './list.dto';
import { ListRepository } from './list.repository';
import { List } from './list.entity';
@Injectable()
export class ListService {
    constructor(private listRepository: ListRepository,
        private boardRepository: BoardRepository){}

    private getResponse(lists: List[]): any[]{
        const response: any[] = [];
        lists.forEach( (element) => {
            response.push({element})
        });

        return response
    }

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
            relations: ['board']
        })
        if( !list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        await this.listRepository.update({ id }, body)
        list = await this.listRepository.findOne({
            where: {id},
            relations: ['board']
        })

        const response: any = {...list};
        return response
    }

    async addList(boardId: any, body: ListDto) {
        const board = await this.boardRepository.findOne({where: {id: boardId.id }});
        const list = await this.listRepository.create({
            ...body,
            board
        });
        await this.listRepository.save(list);
        const response: any = {... list}
        return response
    }

    
    async getListById(listId: any) {
        const id = listId.id
        const list = await this.listRepository.findOne({
            where: {id},
            relations: ['board']
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
            relations: ['board']
        });
        
        return this.getResponse(lists)
    }
}
