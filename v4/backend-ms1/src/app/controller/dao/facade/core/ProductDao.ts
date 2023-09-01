import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
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



    async search(searchDto: ProductCriteria): Promise<Product[]> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, searchDto.code, 'code = :code', {code: searchDto.code});
        this.addConstraint(query, searchDto.reference, 'reference = :reference', {reference: searchDto.reference});
        return this.getResult(searchDto, query);
    }

}