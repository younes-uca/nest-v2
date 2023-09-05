import {Injectable} from "@nestjs/common";
import {RoleDao} from "../dao/RoleDao";
import {Role} from "../bean/Role";

@Injectable()
export class RoleService {
    constructor(private readonly repository: RoleDao) {
    }


    async findOrSave(item: Role): Promise<Role> {
        if (item) {
            const role = await this.repository.findByAuthority(item.authority);
            if (!role) {
                const rolePromise = await this.save(item);
                return rolePromise;
            }
            return role;
        }
        return null;
    }

    async save(item: Role): Promise<Role> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async findAll(): Promise<Role[]> {
        return this.repository.findAll();
    }

    async findById(id: number): Promise<Role> {
        return this.repository.findById(id);
    }


    deleteById(id: number): Promise<void> {
        return this.repository.deleteById(id);
    }

    async findByAuthority(authority: string): Promise<Role> {
        return this.repository.findByAuthority(authority);
    }


}