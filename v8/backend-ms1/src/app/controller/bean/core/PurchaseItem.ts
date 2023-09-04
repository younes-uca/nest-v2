import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

import {Purchase} from "src/app/controller/bean/core/Purchase";
import {Product} from "src/app/controller/bean/core/Product";
import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";


@Entity('purchase_item')
export class PurchaseItem extends AuditBusinessObject {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    price: number;
    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    quantity: number;
    @ManyToOne(() => Product, {eager: true})
    product: Product;
    @ManyToOne(() => Purchase, {eager: true})
    purchase: Purchase;
}
