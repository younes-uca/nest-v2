import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Client} from "src/app/controller/bean/core/Client";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

@Injectable()
export class ClientDao extends  AbstractRepository<Client>{

    constructor(@InjectRepository(Client) private readonly repository: Repository<Client>,) {
        super();
    }

    async save(item: Client): Promise<Client> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<Client[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Client> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }

    findByClientCategoryId(id: number): Promise<Client[]> {
        return this.repository.find({where: {clientCategory: {id}}});
    }

}