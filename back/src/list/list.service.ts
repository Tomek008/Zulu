import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardRepository } from 'src/board/board.repository';
import { ListDto } from './list.dto';
import { ListRepository } from './list.repository';
import { List } from './list.entity';
import { UserRepository } from 'src/auth/user.repository';
import { ensureOwnership, getUserIdFromToken } from 'src/shared/utils';
import { CardRepository } from 'src/card/card.repository';
import { Console } from 'console';
import { Card } from 'src/card/card.entity';
@Injectable()
export class ListService {

    constructor(private listRepository: ListRepository,
        private boardRepository: BoardRepository,
        private userRepository: UserRepository,
        private cardRepository: CardRepository){}
    
    get_response(list: List){
        const response: any = {
            "id": list.id,
            "name": list.name,
            "author_id": list.author.id,
            "board_id": list.board.id,
            "cards": list.cards
        }
        return response
    }
    
    get_all_response(lists: List[]){
        let returnList = []
        for(var list of lists){
            returnList.push(this.get_response(list))
        }
        return returnList
    }

    async delete(req:any, id: any) {
        let userId = await getUserIdFromToken(req)
        const list = await this.listRepository.findOne({
            where:{ id },
            relations: ['author', 'board', 'cards']
        });
        if(! ensureOwnership(userId, list.author.id)){
            return new HttpException('You dont have permission to this list', HttpStatus.FORBIDDEN);

          }
        if( !list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        await this.listRepository.remove(list)
        const response: any = this.get_response(list)
        return response

    }
    async update(id: any, body: ListDto) {
        let list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author', 'cards']
        })
        if( !list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND);
        }
        await this.listRepository.update({ id }, body)
        list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author', 'cards']
        })

        const response: any = this.get_response(list)
        return response
    }

    async addList(req: any, boardId: any, body: ListDto) {
        Logger.log(req)
        let userId = await getUserIdFromToken(req)
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
            author: author, 
        });
        await this.listRepository.save(list);
        const response: any = this.get_response(list)
        return response
    }

    
    async getListById(listId: any) {
        const id = listId.id
        const list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author', 'cards']
        });
        Logger.log(list.cards)
        if(!list){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND)
        }
        const response: any = this.get_response(list)
        return response;
    }

    async getListsByBoardId(boardId: number) {
        const lists = await this.listRepository.find({
            where: {board: {id: boardId}},
            relations: ['board', 'author', 'cards']
        });
        
        const response: any = this.get_all_response(lists)
        return response;
    }

    async move(id: any, index: number, cardId: number) {
        let list = await this.listRepository.findOne({
            where: {id},
            relations: ['board', 'author', 'cards']
        });
        if(!list ){
            throw new HttpException('List not found', HttpStatus.NOT_FOUND)

        }
        const card = await this.cardRepository.findOne({
            where: {id: cardId},
            relations: ['list']
        })
        if(!card ){
            throw new HttpException('Card not found', HttpStatus.NOT_FOUND)
        }

        const newCards = this.insert(list.cards, index, cardId)
        // await this.listRepository.update({ id }, {cards: newCards})
        const response = this.get_response(list)
        return response
    }
    async insert(array: Card[], newIndex: number, item: any){
        array = array.filter(element => element.id != item);
        const card = await this.cardRepository.findOne({
            where: {id: item},
            relations: ['list']
        })

        array.splice(newIndex, 0, card)
        array.forEach(element =>{
            Logger.log(element.id)
            this.cardRepository.update({id: element.id}, {} )
        })
        return array
    }
    
}
