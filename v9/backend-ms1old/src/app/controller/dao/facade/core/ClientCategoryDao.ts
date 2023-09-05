import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";

@Injectable()
export class ClientCategoryDao extends AbstractRepository<ClientCategory, ClientCategoryCriteria> {

    constructor(@InjectRepository(ClientCategory) private readonly repository: Repository<ClientCategory>,) {
        super(repository);
    }

    async save(item: ClientCategory): Promise<ClientCategory> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: ClientCategory): Promise<ClientCategory> {
        if (item.id) {
            const entity = await this.findById(item.id);
            if (!entity) {
                throw new Error('Entity not found');
            }
            Object.assign(entity, item);
            return this.repository.save(entity);
        } else {
            return this.repository.save(item);
        }
    }

    async  findAllOptimized(): Promise<ClientCategoryDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.reference AS reference'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ClientCategoryDto(row.id, row.reference)));


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



    public constructQuery(criteria: ClientCategoryCriteria): SelectQueryBuilder<ClientCategory> {
        const query = this.initQuery(this.repository);

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraint(query, criteria.code, 'code = :code', {code: criteria.code});
        return query;
    }

}