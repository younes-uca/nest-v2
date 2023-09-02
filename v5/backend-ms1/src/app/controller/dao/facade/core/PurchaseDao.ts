import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";

@Injectable()
export class PurchaseDao extends AbstractRepository<Purchase, PurchaseCriteria> {

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

    async findById(id: number): Promise<Purchase> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }

    findByClientId(id: number): Promise<Purchase[]> {
        return this.repository.find({where: {client: {id}}});
    }


    public constructQuery(criteria: PurchaseCriteria): SelectQueryBuilder<Purchase> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraintMinMax(query, criteria.purchaseDateFrom, criteria.purchaseDateTo, 'purchaseDate >= :purchaseDateFrom', 'purchaseDate <= :purchaseDateTo', {purchaseDateFrom: criteria.purchaseDateFrom,purchaseDateTo: criteria.purchaseDateTo,});
        this.addConstraint(query, criteria.image, 'image = :image', {image: criteria.image});
        this.addConstraintMinMax(query, criteria.totalMin, criteria.totalMax, 'total >= :totalMin', 'total <= :totalMax', {totalMin: criteria.totalMin,totalMax: criteria.totalMax,});
        if (criteria.client) {
            const client = criteria.client;
            this.addConstraint(query, criteria.client.id, 'client.id = :clientId', {clientId: client.id,});
            this.addConstraint(query, criteria.client.fullName, 'client.fullName = :clientFullName', {clientFullName: client.fullName,});
        }
        return query;
    }

}