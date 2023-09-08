import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {ProductDao} from "src/app/controller/dao/facade/core/ProductDao";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";
import {Product} from "src/app/controller/bean/core/Product";
import {ProductDto} from "src/app/controller/dto/ProductDto";


@Injectable()
export class ProductAdminServiceImpl extends AbstractServiceImpl<Product, ProductCriteria, ProductDao>{

    constructor(private readonly dao: ProductDao ,
    ) {
        super(dao);
    }

    async save(item: Product): Promise<Product> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: Product): Promise<Product> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Product[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<ProductDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<Product[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Product> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Product with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: Product[]): Promise<Product[]> {
        const deletedItems: Product[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<Product> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: Product): Promise<Product> {
         return await this.dao.saveOrUpdate(item);
    }
}

