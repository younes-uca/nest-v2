import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Client} from "src/app/controller/bean/core/Client";
import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";

@Injectable()
export class ClientDao extends AbstractRepository<Client, ClientCriteria> {

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


    public constructQuery(criteria: ClientCriteria): SelectQueryBuilder<Client> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, criteria.fullName, 'fullName = :fullName', {fullName: criteria.fullName});
        this.addConstraint(query, criteria.email, 'email = :email', {email: criteria.email});
        if (criteria.clientCategory) {
            const clientCategory = criteria.clientCategory;
            this.addConstraint(query, criteria.clientCategory.id, 'clientCategory.id = :clientCategoryId', {clientCategoryId: clientCategory.id,});
            this.addConstraint(query, criteria.clientCategory.reference, 'clientCategory.reference = :clientCategoryReference', {clientCategoryReference: clientCategory.reference,});
        }
        return query;
    }

}