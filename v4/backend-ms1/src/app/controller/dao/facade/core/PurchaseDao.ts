import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";
import {SelectQueryBuilder} from "typeorm/query-builder/SelectQueryBuilder";
import {Product} from "../../../bean/core/Product";

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


    public constructQuery(searchDto: PurchaseCriteria): SelectQueryBuilder<Purchase> {
        const query = this.initQuery(this.repository);
        this.addConstraint(query, searchDto.reference, 'reference = :reference', {reference: searchDto.reference});
        this.addConstraintMinMax(query, searchDto.purchaseDateFrom, searchDto.purchaseDateTo, 'purchaseDate >= :purchaseDateFrom', 'purchaseDate <= :purchaseDateTo', {purchaseDateFrom: searchDto.purchaseDateFrom,purchaseDateTo: searchDto.purchaseDateTo,});
        this.addConstraint(query, searchDto.image, 'image = :image', {image: searchDto.image});
        this.addConstraintMinMax(query, searchDto.totalMin, searchDto.totalMax, 'total >= :totalMin', 'total <= :totalMax', {totalMin: searchDto.totalMin,totalMax: searchDto.totalMax,});
        if (searchDto.client) {
            const client = searchDto.client;
            this.addConstraint(query, searchDto.client.id, 'client.id = :clientId', {clientId: client.id,});
            this.addConstraint(query, searchDto.client.fullName, 'client.fullName = :clientFullName', {clientFullName: client.fullName,});
        }
        return query;
    }


    }