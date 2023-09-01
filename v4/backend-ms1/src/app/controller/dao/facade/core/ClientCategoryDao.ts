import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";

@Injectable()
export class ClientCategoryDao extends AbstractRepository<ClientCategory, ClientCategoryCriteria> {

    constructor(@InjectRepository(ClientCategory) private readonly repository: Repository<ClientCategory>,) {
        super();
    }

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



    async search(searchDto: ClientCategoryCriteria): Promise<ClientCategory[]> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, searchDto.reference, 'reference = :reference', {reference: searchDto.reference});
        this.addConstraint(query, searchDto.code, 'code = :code', {code: searchDto.code});
        return this.getResult(searchDto, query);
    }

}