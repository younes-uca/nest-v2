import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";


@Entity('client')
export class Client  {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    fullName: string;
    @ManyToOne(() => ClientCategory, { eager: true })
    clientCategory: ClientCategory;
}
