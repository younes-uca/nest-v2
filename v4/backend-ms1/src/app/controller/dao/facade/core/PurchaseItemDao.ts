import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemCriteria} from "src/app/controller/dao/criteria/core/PurchaseItemCriteria";

@Injectable()
export class PurchaseItemDao extends AbstractRepository<PurchaseItem, PurchaseItemCriteria> {

    constructor(@InjectRepository(PurchaseItem) private readonly repository: Repository<PurchaseItem>,) {
        super();
    }

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


    async search(searchDto: PurchaseItemCriteria): Promise<PurchaseItem[]> {
        const query = this.initQuery(this.repository);
        this.addConstraintMinMax(query, searchDto.priceMin, searchDto.priceMax, 'price >= :priceMin', 'price <= :priceMax', {priceMin: searchDto.priceMin,priceMax: searchDto.priceMax,});
        this.addConstraintMinMax(query, searchDto.quantityMin, searchDto.quantityMax, 'quantity >= :quantityMin', 'quantity <= :quantityMax', {quantityMin: searchDto.quantityMin,quantityMax: searchDto.quantityMax,});
        if (searchDto.product) {
            const product = searchDto.product;
            this.addConstraint(query, searchDto.product.id, 'product.id = :productId', {productId: product.id,});
            this.addConstraint(query, searchDto.product.reference, 'product.reference = :productReference', {productReference: product.reference,});
        }
        if (searchDto.purchase) {
            const purchase = searchDto.purchase;
            this.addConstraint(query, searchDto.purchase.id, 'purchase.id = :purchaseId', {purchaseId: purchase.id,});
            this.addConstraint(query, searchDto.purchase.reference, 'purchase.reference = :purchaseReference', {purchaseReference: purchase.reference,});
        }
        return this.getResult(searchDto, query);
    }

}