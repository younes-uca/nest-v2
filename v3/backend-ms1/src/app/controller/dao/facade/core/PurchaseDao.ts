import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Purchase} from "src/app/controller/bean/core/Purchase";

@Injectable()
export class PurchaseDao {

    constructor(@InjectRepository(Purchase) private readonly repository: Repository<Purchase>,) { }

    async save(item: Purchase): Promise<Purchase> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<Purchase[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<Purchase> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }

    findByClientId(id: number): Promise<Purchase[]> {
        return this.repository.find({where: {client: {id}}});
    }

}