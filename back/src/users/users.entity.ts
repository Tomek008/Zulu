import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    login: string;

    @Column({type: 'text'})
    pawwsord: string;
}