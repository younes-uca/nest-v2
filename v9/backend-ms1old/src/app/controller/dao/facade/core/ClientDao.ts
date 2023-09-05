import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Client} from "src/app/controller/bean/core/Client";
import {ClientDto} from "src/app/controller/dto/ClientDto";
import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";

@Injectable()
export class ClientDao extends AbstractRepository<Client, ClientCriteria> {

    constructor(@InjectRepository(Client) private readonly repository: Repository<Client>,) {
        super(repository);
    }

    async save(item: Client): Promise<Client> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: Client): Promise<Client> {
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

    async  findAllOptimized(): Promise<ClientDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id', 'item.fullName AS fullName'])
                    .getRawMany()
                    .then((result) => result.map((row) => new ClientDto(row.id, row.fullName)));


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


    public constructQuery(criteria: ClientCriteria): SelectQueryBuilder<Client> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.clientCategory', 'clientCategory')
            .select(['item' , 'clientCategory'])

        this.addConstraint(query, criteria.fullName, 'fullName = :fullName', {fullName: criteria.fullName});
        if (criteria.clientCategory) {
            const clientCategory = criteria.clientCategory;
            this.addConstraint(query, clientCategory.id, 'clientCategory.id = :clientCategoryId', {clientCategoryId: clientCategory.id,});
            this.addConstraint(query, clientCategory.reference, 'clientCategory.reference = :clientCategoryReference', {clientCategoryReference: clientCategory.reference,});
        }
        return query;
    }

}