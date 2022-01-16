import { TaskList } from "src/tasklist/tasklist.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('element')
export class Element{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    title: String;

    @Column()
    done: boolean 

    @ManyToOne(type => TaskList, taskList => taskList.elements)
    taskList: TaskList
    
}