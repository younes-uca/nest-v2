import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity('product')
export class Product{

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    code: string;
    @Column({ length: 500 })
    reference: string;
}
