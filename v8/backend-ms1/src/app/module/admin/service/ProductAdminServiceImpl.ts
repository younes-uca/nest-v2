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

    async save(product: Product): Promise<Product> {
        const savedProduct = await this.dao.save(product);
        return savedProduct;
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

    async deleteById(id: number): Promise<void> {
        return this.dao.deleteById(id);
    }

    async delete(product: Product): Promise<Product> {
        const existingProduct = await this.findWithAssociatedLists(product.id);
        if (!existingProduct) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Product with ID ${product.id} not found.`);
        }
        await this.dao.deleteById(existingProduct.id);
        return existingProduct;
    }

    async deleteMultiple(products: Product[]): Promise<Product[]> {
        const deletedProducts: Product[] = [];
        for (const product of products) {
            const deletedProduct = await this.delete(product);
            deletedProducts.push(deletedProduct);
        }
        return deletedProducts;
    }


    async findWithAssociatedLists(id: number): Promise<Product> {
        const result = await this.dao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

