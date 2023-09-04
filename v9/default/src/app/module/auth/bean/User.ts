import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";

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
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: Role;

}