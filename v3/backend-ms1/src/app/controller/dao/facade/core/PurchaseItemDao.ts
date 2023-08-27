import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";

@Injectable()
export class PurchaseItemDao {

    constructor(@InjectRepository(PurchaseItem) private readonly repository: Repository<PurchaseItem>,) { }

    async save(item: PurchaseItem): Promise<PurchaseItem> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<PurchaseItem[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<PurchaseItem> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }

    findByProductId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({where: {product: {id}}});
    }
    findByPurchaseId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({where: {purchase: {id}}});
    }

}