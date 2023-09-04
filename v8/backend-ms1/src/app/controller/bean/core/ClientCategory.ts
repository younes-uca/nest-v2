import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';



@Entity('client_category')
export class ClientCategory  {

    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 500 })
    reference: string;
    @Column({ length: 500 })
    code: string;
}
