import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {Product} from "src/app/controller/bean/core/Product";
import {Client} from "src/app/controller/bean/core/Client";

import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity('purchase')
export class Purchase  extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    reference: string;
    @Column()
    purchaseDate: Date;
    @Column({ length: 500 })
    image: string;
    @Column({ default: false })
    etat: boolean;
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total: number;
    @Column({ length: 500 })
    description: string;
    @ManyToOne(() => Client, { eager: true })
    client: Client;
    @OneToMany(() => PurchaseItem, purchaseItem => purchaseItem.purchase)
    purchaseItems: PurchaseItem[];
}
