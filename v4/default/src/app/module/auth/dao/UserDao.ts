import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../bean/User";

@Injectable()
export class UserDao {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>,) { }

    async save(item: User): Promise<User> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<User[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<User> {
        return this.repository.findOne({where: {id}});
    }

    async findByUsername(username: string): Promise<User> {
        return this.repository.findOne({where: {username}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }


}