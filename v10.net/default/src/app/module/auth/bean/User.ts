import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "./Role";
import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";

@Entity("user_app")
export class User  extends AuditBusinessObject {
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