import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {AuditBusinessObject} from "../../../zynerator/audit/AuditBusinessObject";



@Entity('client_category')
export class ClientCategory  extends AuditBusinessObject{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    reference: string;
    @Column({ length: 500 })
    code: string;
}
