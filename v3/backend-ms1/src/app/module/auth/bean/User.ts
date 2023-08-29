import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user_app")
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  email: string;
  @Column({ length: 500 })
  username: string;
  @Column({ length: 500 })
  password: string;

}