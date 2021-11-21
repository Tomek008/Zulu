import { Board } from "src/board/board.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({type: 'text'})
    login: string;

    @Column({type: 'text'})
    password: string;

    @OneToMany(type => Board, board => board.author)
    boards: Board[];
}