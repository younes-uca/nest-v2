import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../bean/Role";

@Injectable()
export class RoleDao {

    constructor(@InjectRepository(Role) private readonly repository: Repository<Role>,) { }

    async save(item: Role): Promise<Role> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<Role[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Role> {
        return this.repository.findOne({where: {id}});
    }

    async findByAuthority(authority: string): Promise<Role> {
        return this.repository.findOne({where: {authority}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }


}