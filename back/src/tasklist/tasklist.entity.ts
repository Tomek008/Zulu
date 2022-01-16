import { Card } from "src/card/card.entity";
import { Element } from "src/element/element.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tasklist')
export class TaskList{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: String;

    @ManyToOne(type => Card, card => card.taskLists)
    card: Card

    @OneToMany(type => Element, element => element.taskList)
    elements: Element[]
}