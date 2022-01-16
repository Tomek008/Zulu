import { User } from "src/auth/users.entity";
import { Card } from "src/card/card.entity";
import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string

    @ManyToOne(type => User, author => author.comments, {cascade: true})
    author: User

    @ManyToOne(type => Card, card => card.comments)
    card: Card
}