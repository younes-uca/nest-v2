import { BusinessObject } from "src/app/zynerator/bean/BusinessObject";
import { BaseCriteria } from "src/app/zynerator/criteria/BaseCriteria";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {PaginatedList} from "../util/PaginatedList";
import { Page } from 'nestjsx/crud';

export class AbstractServiceImpl<T extends BusinessObject, CRITERIA extends BaseCriteria,  REPO extends AbstractRepository<T>> {

    protected dao : REPO;


    async findPaginatedByCriteria(criteria: CRITERIA, page: number, pageSize: number, order: 'asc' | 'desc', sortField: string,): Promise<PaginatedList<T>> {
        // const mySpecification = this.constructSpecification(criteria);

        const result: Page<T> = await this.dao.findAndCount({
            where: mySpecification,
            order: { [sortField]: order },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const paginatedList: PaginatedList<T> = new PaginatedList(result.items, result.total);
        return paginatedList;
    }



}
