import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ListRepository } from 'src/list/list.repository';
import { CardDescription, CardDto } from './card.dto';
import { Card } from './card.entity';
import { CardRepository } from './card.repository';

@Injectable()
export class CardService {
    constructor(private listRepository: ListRepository,
                private cardRepository: CardRepository){}
    
    async get(cardId: number){
        const card = await this.cardRepository.findOne({
            where: {id: cardId},
            relations: ['list', 'comments']
        })
        if(! card){
            throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
        }
        const response: any = this.get_response(card)
        return response
    }

    async create(listId: number, body: CardDto){
        
        const list = await this.listRepository.findOne({
            where: {id: listId},
            relations: ['cards']
        })
        if(! list){
            throw new HttpException("List not found", HttpStatus.NOT_FOUND)
        }
        let posittionOnList = list.cards.length
        const card = await this.cardRepository.create({
            ...body, 
            list: list,
            posittionOnList: posittionOnList
        })
        await this.cardRepository.save(card);
        const response: any = this.get_response(card)
        return response
    }

    async setDescription(id: number, body: CardDescription){
        const card = await this.cardRepository.findOne({
            where: {id: id},
            relations: ['list', 'comments']
        })
        if(!card){
            throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
        }

        await this.cardRepository.update({id}, {description: body.description})
        Logger.log(card)
        const response: any = this.get_response(card)
        return response
    }

    async delete(id: number){
        const card = await this.cardRepository.findOne({
            where: {id: id},
            relations: ['list', 'comments']
        })

        if(!card){
            throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
        }

        await this.cardRepository.delete({id})
        const response = this.get_response(card)
        return response
    }

    get_response(card: Card): any {
        const response ={
            "id": card.id,
            "createdAt": card.createdAt,
            "name": card.name,
            "description": card.description,
            "position": card.posittionOnList,
            "list_id": card.list.id,
            "comments": card.comments
        }
        return response
    }
}
