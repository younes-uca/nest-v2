import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";

@Injectable()
export class ClientCategoryDao {

    constructor(@InjectRepository(ClientCategory) private readonly repository: Repository<ClientCategory>,) { }

    async save(item: ClientCategory): Promise<ClientCategory> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<ClientCategory[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<ClientCategory> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }


}