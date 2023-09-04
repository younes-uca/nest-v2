import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";

@Injectable()
export class PurchaseDao extends AbstractRepository<Purchase, PurchaseCriteria> {

    constructor(@InjectRepository(Purchase) private readonly repository: Repository<Purchase>,) {
        super(repository);
    }

    async save(item: Purchase): Promise<Purchase> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async update(item: Purchase): Promise<Purchase> {
        const entity = await this.findById(item.id);
        if (!entity) {
            throw new Error('Entity not found');
        }
        Object.assign(entity, item);
        return this.repository.save(entity);
    }

    async findAllOptimized(): Promise<PurchaseDto[]> {
        return this.repository
            .createQueryBuilder('item')
            .select(['item.id AS id', 'item.reference AS reference'])
            .getRawMany()
            .then((result) => result.map((row) => new PurchaseDto(row.id, row.reference)));


    }

    async findAll(): Promise<Purchase[]> {
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
        const query = this.initQuery(this.repository)
            .leftJoin('item.client', 'client')
            .select(['item', 'client'])

        this.addConstraint(query, criteria.reference, 'reference = :reference', {reference: criteria.reference});
        this.addConstraintMinMax(query, criteria.purchaseDateFrom, criteria.purchaseDateTo, 'purchaseDate >= :purchaseDateFrom', 'purchaseDate <= :purchaseDateTo', {
            purchaseDateFrom: criteria.purchaseDateFrom,
            purchaseDateTo: criteria.purchaseDateTo,
        });
        this.addConstraint(query, criteria.image, 'image = :image', {image: criteria.image});
        this.addConstraint(query, criteria.etat, 'etat = :etat', {etat: criteria.etat});
        this.addConstraintMinMax(query, criteria.totalMin, criteria.totalMax, 'total >= :totalMin', 'total <= :totalMax', {
            totalMin: criteria.totalMin,
            totalMax: criteria.totalMax,
        });
        if (criteria.client) {
            const client = criteria.client;
            this.addConstraint(query, client.id, 'client.id = :clientId', {clientId: client.id,});
            this.addConstraint(query, client.fullName, 'client.fullName = :clientFullName', {clientFullName: client.fullName,});
        }
        return query;
    }

}