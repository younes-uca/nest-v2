import {Repository, SelectQueryBuilder} from "typeorm";
import {BaseCriteria} from "../criteria/BaseCriteria";
import {PurchaseCriteria} from "../../controller/dao/criteria/core/PurchaseCriteria";
import {Purchase} from "../../controller/bean/core/Purchase";

export abstract class AbstractRepository<T, C extends BaseCriteria> {


    public abstract constructQuery(crieria: C): SelectQueryBuilder<T>;
    public addConstraint(query: SelectQueryBuilder<T>, attribute: any, constraint: string, queryParams: any) {
        if (attribute) {
            query.andWhere("item." + constraint, queryParams);
        }
    }

    public addConstraintMinMax(query: SelectQueryBuilder<T>, attributeMin: any, attributeMax: any, constraintMin: string, constraintMax: string , queryParams: any) {
        this.addConstraint(query, attributeMin, constraintMin, queryParams);
        this.addConstraint(query, attributeMax, constraintMax, queryParams);
    }

    public getPaginatedResult(criteria: C, query: SelectQueryBuilder<T>) {
        const {page, maxResults} = criteria;
        const skip = (page - 1) * maxResults;
        query.skip(skip).take(maxResults);
        return query.getMany();
    }
    public getResult(query: SelectQueryBuilder<T>) {
        return query.getMany();
    }

    public initQuery(repository: Repository<T>) {
        return repository.createQueryBuilder("item");
    }

    public async findPaginatedByCriteria(criteria: C): Promise<T[]> {
        const query = this.constructQuery(criteria);
        return this.getPaginatedResult(criteria,query);
    }


    public async findByCriteria(criteria: C): Promise<T[]> {
        const query = this.constructQuery(criteria);
        return this.getResult(query);
    }

}
