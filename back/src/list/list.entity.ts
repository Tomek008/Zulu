import { Board } from "src/board/board.entity";
import { User } from "src/auth/users.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class List{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: string;

    @ManyToOne(type => User)
    @JoinTable()
    author: User

    @ManyToOne(type => Board, board => board.lists)
    board: Board
}