import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskList } from 'src/tasklist/tasklist.entity';
import { TaskListRepository } from 'src/tasklist/tasklist.repository';
import { ElementDto } from './element.dto';
import { ElementRepository } from './element.repository';
import { Element } from './element.entity';

@Injectable()
export class ElementService {
   
    constructor(private taskListRepository: TaskListRepository, private elementRepository: ElementRepository){}

    async get(id: any) {
        const element = await this.elementRepository.findOne({
            where: {id},
            relations: ['taskList']
        })
        if(! element){
            throw new HttpException("Element not found", HttpStatus.NOT_FOUND)
        }
        const response: any = this.get_response(element)
        return response

    }
    async getByTaskListId(id: any) {
        const taskList = await this.taskListRepository.findOne({
            where: {id},
            relations: ['elements', ]
        })
        if(!taskList){
            throw new HttpException("Task list not found", HttpStatus.NOT_FOUND)
        }
        let elements: Element[] = []
        for(const elementLoop of taskList.elements){
            id = elementLoop.id
            let element = await this.elementRepository.findOne({
                where: {id},
                relations: ['taskList']
            })
            elements.push(element)
        }    

        const response: any = this.get_all_response(elements)
        return response
    }
    async create(id: any, body: ElementDto) {
        const taskList = await this.taskListRepository.findOne({
            where: {id},
            relations: ['elements', ]
        })
        if(!taskList){
            throw new HttpException("Task list not found", HttpStatus.NOT_FOUND)
        }

        const element = await this.elementRepository.create({
            ...body, 
            taskList: taskList,
            done: false
        })
        await this.elementRepository.save(element)
        const response: any = this.get_response(element)
        return response

    }

    async toggle(id: any) {
        const element = await this.elementRepository.findOne({
            where: {id},
            relations: ['taskList']
        })
        if(! element){
            throw new HttpException("Element not found", HttpStatus.NOT_FOUND)
        }
        let newDone = ! element.done
        await this.elementRepository.update({id}, {done: newDone});
        const response: any = this.get_response(element)
        return response
    }

    get_response(element: Element): any {
        const response = {
            'id' : element.id, 
            'title': element.title,
            'done': element.done,
            'task_list_id': element.taskList.id
        }
        return response
    }

    get_all_response(elementArray: Element[] ){
        let responseArray = []
        elementArray.forEach(element =>{
            responseArray.push(this.get_response(element))
        })
        return responseArray
    }
}
