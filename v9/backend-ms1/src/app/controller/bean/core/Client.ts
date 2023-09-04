import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('client')
export class Client  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    fullName: string;
    @ManyToOne(() => ClientCategory, { eager: true })
    clientCategory: ClientCategory;
}
