import { List } from "src/list/list.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(type => List, list => list.cards, {onDelete: 'CASCADE'})
    list: List


}