import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";

import {User} from "src/app/module/auth/bean/User";

@Entity('client')
export class Client  extends User  {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    fullName: string;
    @Column({ default: false })
    credentialsNonExpired: boolean;
    @Column({ default: false })
    enabled: boolean;
    @Column({ default: false })
    accountNonExpired: boolean;
    @Column({ default: false })
    accountNonLocked: boolean;
    @Column({ default: false })
    passwordChanged: boolean;
    @Column({ length: 500 })
    username: string;
    @Column({ length: 500 })
    password: string;
    @ManyToOne(() => ClientCategory, { eager: true })
    clientCategory: ClientCategory;
}
