import {Injectable, NotFoundException} from "@nestjs/common";

import {ProductDao} from "src/app/controller/dao/facade/core/ProductDao";
import {Product} from "src/app/controller/bean/core/Product";


@Injectable()
export class ProductAdminServiceImpl  {

    constructor(private readonly productDao: ProductDao,
    ) {}

    async save(product: Product): Promise<Product> {
        const savedProduct = await this.productDao.save(product);
        return savedProduct;
    }

    async findAll(): Promise<Product[]> {
        return this.productDao.findAll();
    }

    async findById(id: number): Promise<Product> {
        return this.productDao.findById(id);
    }

    async delete(product: Product): Promise<Product> {
        const existingProduct = await this.findWithAssociatedLists(product.id);
        if (!existingProduct) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Product with ID ${product.id} not found.`);
        }
        await this.productDao.deleteById(existingProduct.id);
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
        const result = await this.productDao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

