import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {PurchaseItemCriteria} from "src/app/controller/dao/criteria/core/PurchaseItemCriteria";

@Injectable()
export class PurchaseItemDao extends AbstractRepository<PurchaseItem, PurchaseItemCriteria> {

    constructor(@InjectRepository(PurchaseItem) private readonly repository: Repository<PurchaseItem>,) {
        super(repository);
    }

    async save(item: PurchaseItem): Promise<PurchaseItem> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }


    async saveOrUpdate(item: PurchaseItem): Promise<PurchaseItem> {
        if (item.id) {
            const entity = await this.findById(item.id);
            if (!entity) {
                throw new Error('Entity not found');
            }
            Object.assign(entity, item);
            return this.repository.save(entity);
        } else {
            return this.repository.save(item);
        }
    }

    async  findAllOptimized(): Promise<PurchaseItemDto[]> {
        return this.repository
                    .createQueryBuilder('item')
                    .select(['item.id AS id'])
                    .getRawMany()
                    .then((result) => result.map((row) => new PurchaseItemDto(row.id)));


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

    async findByProductId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({where: {product: {id}}});
    }
    async findByPurchaseId(id: number): Promise<PurchaseItem[]> {
        return this.repository.find({where: {purchase: {id}}});
    }
    async deleteByPurchaseId(id: number): Promise<number> {
        const result = await this.repository.delete({ purchase: { id } });
        return result.affected;
    }


    public constructQuery(criteria: PurchaseItemCriteria): SelectQueryBuilder<PurchaseItem> {
        const query = this.initQuery(this.repository)
            .leftJoin('item.product', 'product')
            .leftJoin('item.purchase', 'purchase')
            .select(['item' , 'product', 'purchase'])

        this.addConstraintMinMax(query, criteria.priceMin, criteria.priceMax, 'price >= :priceMin', 'price <= :priceMax', {priceMin: criteria.priceMin,priceMax: criteria.priceMax,});
        this.addConstraintMinMax(query, criteria.quantityMin, criteria.quantityMax, 'quantity >= :quantityMin', 'quantity <= :quantityMax', {quantityMin: criteria.quantityMin,quantityMax: criteria.quantityMax,});
        if (criteria.product) {
            const product = criteria.product;
            this.addConstraint(query, product.id, 'product.id = :productId', {productId: product.id,});
            this.addConstraint(query, product.reference, 'product.reference = :productReference', {productReference: product.reference,});
        }
        if (criteria.purchase) {
            const purchase = criteria.purchase;
            this.addConstraint(query, purchase.id, 'purchase.id = :purchaseId', {purchaseId: purchase.id,});
            this.addConstraint(query, purchase.reference, 'purchase.reference = :purchaseReference', {purchaseReference: purchase.reference,});
        }
        return query;
    }

}