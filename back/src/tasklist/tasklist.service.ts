import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { response } from 'express';
import { Card } from 'src/card/card.entity';
import { CardRepository } from 'src/card/card.repository';
import { TaskListDto } from './tasklist.dto';
import { TaskList } from './tasklist.entity';
import { TaskListRepository } from './tasklist.repository';

@Injectable()
export class TasklistService {
    constructor(private cardRepository: CardRepository, private taskListRepository: TaskListRepository){}
    async get(id: any) {
        const taskList = await this.taskListRepository.findOne({
            where: {id},
            relations: ['elements', 'card' ]
        })
        if(!taskList){
            throw new HttpException("Task list not found", HttpStatus.NOT_FOUND)
        }
        const response: any = this.get_response(taskList)
        return response
    }

    async getByCardId(id: any) {
        const card = await this.cardRepository.findOne({
            where: {id: id},
            relations: ['list', 'comments', 'taskLists',]
        })
        if(!card){
            throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
        }
        let taskLists: TaskList[] = []
        for( const task of card.taskLists){
            id = task.id
            let taskList = await this.taskListRepository.findOne({
                where: {id},
                relations: ['elements', 'card']
            })
            taskLists.push(taskList)
        }
           

        const response: any = this.get_all_response(taskLists)
        return response
    }

    async create(id: any, body: TaskListDto) {
        const card = await this.cardRepository.findOne({
            where: {id: id},
            relations: ['list', 'comments', 'taskLists']
        })
        if(!card){
            throw new HttpException("Card not found", HttpStatus.NOT_FOUND)
        }

        const taskList = await this.taskListRepository.create({
            ...body,
            card: card
        })
        await this.taskListRepository.save(taskList)
        const response: any = this.get_response(taskList)
        return response
    }

    get_response(task: TaskList): any {
        const response = {
            'id': task.id,
            'title': task.title,
            'elements': task.elements,
            'card_id': task.card.id
        }
        return response
    }

    get_all_response(taskArray: TaskList[] ){
        let responseArray = []
        taskArray.forEach(element =>{
            responseArray.push(this.get_response(element))
        })
        return responseArray
    }
}
