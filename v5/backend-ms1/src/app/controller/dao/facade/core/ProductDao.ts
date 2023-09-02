import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Product} from "src/app/controller/bean/core/Product";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";

@Injectable()
export class ProductDao extends AbstractRepository<Product, ProductCriteria> {

    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>,) {
        super();
    }

    async save(item: Product): Promise<Product> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<Product[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Product> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }



    public constructQuery(criteria: ProductCriteria): SelectQueryBuilder<Product> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, criteria.code, 'code = :code', {code: criteria.code});
        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        return query;
    }

}