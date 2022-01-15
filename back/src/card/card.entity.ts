import { List } from "src/list/list.entity";
import { Comment } from "src/comment/comment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('card')
export class Card{
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column()
    name: string

    @Column({nullable: true})
    description: string
    
    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    posittionOnList: number

    @ManyToOne(type => List, list => list.cards, {onDelete: 'CASCADE'})
    list: List

    @OneToMany(type => Comment, comment => comment.card)
    comments: Comment[]

}