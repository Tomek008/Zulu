import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { response } from 'express';
import { UserRepository } from 'src/auth/user.repository';
import { CardRepository } from 'src/card/card.repository';
import { ListRepository } from 'src/list/list.repository';
import { ensureOwnership, getUserIdFromToken } from 'src/shared/utils';
import { CommentDto } from './comment.dto';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
    
    constructor(private commentRepository: CommentRepository,
                private userRepository: UserRepository,
                private cardRepository: CardRepository){}

    async create(authorization: any, cardId: number, body: CommentDto) {
        let id = await getUserIdFromToken(authorization)
        const user = await this.userRepository.findOne({where: {id}})
        if(!user){
            return new HttpException('User not found', HttpStatus.NOT_FOUND);

        }
        id = cardId
        const card = await this.cardRepository.findOne({where: {id},
            relations: ['list', 'comments']
        })
        if(! card){
            return new HttpException("Card not found", HttpStatus.NOT_FOUND);
        }
        const comment = await this.commentRepository.create({
            ...body,
            author: user,
            card: card
        })
        await this.commentRepository.save(comment)

        const response = this.get_response(comment)
        return response


    }

    async delete(authorization: string, commentId: any) {
        let id = await getUserIdFromToken(authorization)
        const comment = await this.commentRepository.findOne({
            where: {id},
            relations: ['card', 'author']
        })
        if(! comment){
            return new HttpException('Comment not found', HttpStatus.NOT_FOUND);

        }
        if(! ensureOwnership(id, comment.id)){
            return new HttpException('You dont have permission to this comment', HttpStatus.FORBIDDEN);
        }

        await this.commentRepository.delete(comment)
        const response = this.get_response(comment)
        return response
    }
    async get(id: any) {
        const comment = await this.commentRepository.findOne({
            where: {id},
            relations: ['card', 'author']
        })
        if(! comment){
            return new HttpException('Comment not found', HttpStatus.NOT_FOUND);
        }
        const response = this.get_response(comment)
        return response
    }

    get_response(comment: Comment){
        const response = {
            "id": comment.id,
            "author_id": comment.author.id,
            "card_id": comment.card.id,
            "content": comment.content
        }
        return response
    }
   


}
