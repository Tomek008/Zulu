import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardDto, BoardRo } from './board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/users.entity';
import { BoardRepository } from './board.repository';
import { UserRepository } from 'src/auth/user.repository';
import { ensureOwnership, getUserIdFromToken } from 'src/shared/utils';

@Injectable()
export class BoardService {
    constructor(
        private boardRepository: BoardRepository,
        private userRepository: UserRepository
    ){}
    get_response(board: Board){
        if(board.lists ==  undefined){
            board.lists = []
        }
        const response: any = {
            "id": board.id,
            "name": board.name,
            "author_id": board.author.id,
            "lists": board.lists
        }
        return response
    }
    get_all_response(boards: Board[]){
        let returnBoard = []
        for(var board of boards){
            returnBoard.push(this.get_response(board))
        }
        return returnBoard
    }
    async showAll(req: any) : Promise<BoardRo[]> {
        let id = await getUserIdFromToken(req)
        const boards = await this.boardRepository.find({
            where: {author: id},
            relations: ['author', 'lists']
        });
        const response: any = this.get_all_response(boards)
        return response;
    }

    async create(req: any, body: BoardDto): Promise<BoardRo>{
        let id = await getUserIdFromToken(req)
        const user = await this.userRepository.findOne({
            where: {id}
        })
        const board = await this.boardRepository.create({... body, author: user})
        await this.boardRepository.save(board);
        const response: any = this.get_response(board)
        return response;
    }

    async show(id: number) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author', 'lists']
          });

          if(!board){
              return new HttpException('Board not found', HttpStatus.NOT_FOUND);
          }

          const response: any = this.get_response(board)
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
        const response: any =  this.get_response(board)
        return response
    }

    async delete(id: number, req: any) {
        let userId = await getUserIdFromToken(req)
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author', 'lists']
          });
          if(! ensureOwnership(userId, board.author.id)){
            return new HttpException('You dont have permission to this board', HttpStatus.FORBIDDEN);

          }
          if(! board){
            return new HttpException('Board not found', HttpStatus.NOT_FOUND);

          }
          await this.boardRepository.remove(board);
          const response: any =  this.get_response(board)
          return response    
        }
    
}
