import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardDto, BoardRo } from './board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/users.entity';
import { BoardRepository } from './board.repository';
import { UserRepository } from 'src/auth/user.repository';

@Injectable()
export class BoardService {
    constructor(
        private boardRepository: BoardRepository,
        private userRepository: UserRepository
    ){}

    async showAll(id: number) : Promise<BoardRo[]> {
        const boards = await this.boardRepository.find({
            where: {author: id},
            relations: ['author', 'lists']
        });
        const response: any = {...boards};
        return response;
    }

    async create(id: number, body: BoardDto): Promise<BoardRo>{
        const user = await this.userRepository.findOne({
            where: {id}
        })
        const board = await this.boardRepository.create({... body, author: user})
        await this.boardRepository.save(board);
        const response: any = {...board};
        return response;
    }

    async show(id: number) {
        Logger.log(id)
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author', 'lists']
          });

          if(!board){
              return new HttpException('Board not found', HttpStatus.NOT_FOUND);
          }

          const response: any = {... board}
          return response
    }

    async update(id: string, body: Partial<BoardDto>) {
        let board = await this.boardRepository.findOne({
            where: {id},
            relations: ['author', 'lists']
        });
        if(!board){
            return new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }
        await this.boardRepository.update({id}, body);
        board = await this.boardRepository.findOne({
            where: {id},
            relations: ['author', 'lists']
        });
        const response: any = {...board};
        return response
    }

    async delete(id: number) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author', 'lists']
          });
          if(! board){
            return new HttpException('Board not found', HttpStatus.NOT_FOUND);

          }
          await this.boardRepository.remove(board);
          const response: any = {...board};
          return response    }
}
