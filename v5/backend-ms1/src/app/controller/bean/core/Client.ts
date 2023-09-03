import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, TableInheritance} from 'typeorm';

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {User} from "src/app/module/auth/bean/User";

@Entity('client')
export class Client extends User{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    fullName: string;
    @ManyToOne(() => ClientCategory, { eager: true })
    clientCategory: ClientCategory;
}
