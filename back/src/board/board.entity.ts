import { List } from "src/list/list.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('board')
export class Board{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: String;

    @ManyToOne(type => User, author => author.boards, {cascade: true})
    @JoinTable()
    author: User;

    @OneToMany(type => List, list => list.board)
    lists: List[]


}