import { Board } from "src/board/board.entity";
import { User } from "src/auth/users.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Card } from "src/card/card.entity";
import { Logger } from "@nestjs/common";

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

    @OneToMany(type => Card, card => card.list)
    cards: Card[]


}