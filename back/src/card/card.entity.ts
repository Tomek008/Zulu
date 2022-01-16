import { List } from "src/list/list.entity";
import { Comment } from "src/comment/comment.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TaskList } from "src/tasklist/tasklist.entity";

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

    @OneToMany(type => TaskList, tasklist => tasklist.card)
    taskLists: TaskList[] 

}