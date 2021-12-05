import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { BoardDto, BoardRo } from './board.dto';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';
@Injectable()
export class BoardService {
    constructor(
        private boardRepository: BoardRepository
    ){}

    private getResponse(boards: Board[]): BoardRo[]{
        const roBoards: any[] = [];
        boards.forEach( (element) => {
            roBoards.push({element})
        });

       return roBoards

    }
    async showAll(id: number) : Promise<BoardRo[]> {
        const boards = await this.boardRepository.find({
            relations: ['author', 'lists']
        });
        return this.getResponse(boards)
    }

    async create(id: number, body: BoardDto): Promise<BoardRo>{
        const user = new User()
        user.login = 'testlogin';
        user.password = 'testpassword';
        user.email = "sda";
        const board = await this.boardRepository.create({... body, author: user})
        await this.boardRepository.save(board);
        const response: any = {...board};
        return response;
    }

    async show(id: number, user: any) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author',]
          });

          if(!board){
              return new HttpException('Board not found', HttpStatus.NOT_FOUND);
          }

          const response: any = {... board}
          return response
    }

    async update(id: string, user: any, body: Partial<BoardDto>) {
        let board = await this.boardRepository.findOne({
            where: {id},
            relations: ['author']
        });
        if(!board){
            return new HttpException('Board not found', HttpStatus.NOT_FOUND);
        }
        await this.boardRepository.update({id}, body);
        board = await this.boardRepository.findOne({
            where: {id},
            relations: ['author']
        });
        const response: any = {...board};
        return response
    }

    async delete(id: number, user: any) {
        const board = await this.boardRepository.findOne({
            where: { id },
            relations: ['author',]
          });
          if(! board){
            return new HttpException('Board not found', HttpStatus.NOT_FOUND);

          }
          await this.boardRepository.remove(board);
          const response: any = {...board};
          return response    }
}
