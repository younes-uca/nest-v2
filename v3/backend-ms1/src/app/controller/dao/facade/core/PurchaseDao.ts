import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Purchase} from "src/app/controller/bean/core/Purchase";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

@Injectable()
export class PurchaseDao extends AbstractRepository<Purchase>{

    constructor(@InjectRepository(Purchase) private readonly repository: Repository<Purchase>,) {
        super();
    }

    async save(item: Purchase): Promise<Purchase> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<Purchase[]> {
        return this.repository.find();
    }

    async  findAndCount(): Promise<Purchase[]> {
        return this.repository.findAndCount();
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