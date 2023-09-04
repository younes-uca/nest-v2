import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {AuditBusinessObject} from "../../../zynerator/audit/AuditBusinessObject";



@Entity('product')
export class Product  extends AuditBusinessObject{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    code: string;
    @Column({ length: 500 })
    reference: string;
}
