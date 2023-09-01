import {Repository, SelectQueryBuilder} from "typeorm";
import {BaseCriteria} from "../criteria/BaseCriteria";

export class AbstractRepository<T, C extends BaseCriteria> {


    public addConstraint(query: SelectQueryBuilder<T>, attribute: any, constraint: string, queryParams: any) {
        if (attribute) {
            query.andWhere("item." + constraint, queryParams);
        }
    }

    public addConstraintMinMax(query: SelectQueryBuilder<T>, attributeMin: any, attributeMax: any, constraintMin: string, constraintMax: string , queryParams: any) {
        this.addConstraint(query, attributeMin, constraintMin, queryParams);
        this.addConstraint(query, attributeMax, constraintMax, queryParams);
    }

    public getResult(searchDto: C, query: SelectQueryBuilder<T>) {
        const {page, maxResults} = searchDto;
        const skip = (page - 1) * maxResults;
        query.skip(skip).take(maxResults);
        return query.getMany();
    }

    public initQuery(repository: Repository<T>) {
        return repository.createQueryBuilder("item");
    }
}
