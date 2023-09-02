import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

export class AbstractServiceImpl<T, C extends BaseCriteria, REPO extends AbstractRepository<T, C>> {

    private repo: REPO;

    constructor(dao: REPO) {
        this.repo = dao;
    }


    public async findPaginatedByCriteria(criteria: C): Promise<T[]> {
        const result = await  this.repo.findPaginatedByCriteria(criteria);
        return result;
    }


    public async findByCriteria(criteria: C): Promise<T[]> {
        const result = await this.repo.findByCriteria(criteria);
        return result;

    }


}
