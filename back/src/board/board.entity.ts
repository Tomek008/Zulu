import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('board')
export class Board{
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('text')
    name: String;

    @ManyToOne(type => User, author => author.boards, {cascade: true})
    @JoinTable()
    author: User;

}