import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity("role_app")
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 500 })
  authority: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];


}