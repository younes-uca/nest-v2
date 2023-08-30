import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Product} from "src/app/controller/bean/core/Product";

@Injectable()
export class ProductDao {

    constructor(@InjectRepository(Product) private readonly repository: Repository<Product>,) { }

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


}