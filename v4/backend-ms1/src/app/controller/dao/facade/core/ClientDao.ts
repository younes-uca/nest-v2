import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
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


    async search(searchDto: ClientCriteria): Promise<Client[]> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, searchDto.fullName, 'fullName = :fullName', {fullName: searchDto.fullName});
        this.addConstraint(query, searchDto.email, 'email = :email', {email: searchDto.email});
        if (searchDto.clientCategory) {
            const clientCategory = searchDto.clientCategory;
            this.addConstraint(query, searchDto.clientCategory.id, 'clientCategory.id = :clientCategoryId', {clientCategoryId: clientCategory.id,});
            this.addConstraint(query, searchDto.clientCategory.reference, 'clientCategory.reference = :clientCategoryReference', {clientCategoryReference: clientCategory.reference,});
        }
        return this.getResult(searchDto, query);
    }

}