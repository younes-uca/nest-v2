import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {PaginatedList} from "../util/PaginatedList";

export class AbstractServiceImpl<T, C extends BaseCriteria, REPO extends AbstractRepository<T, C>> {

  private repo: REPO;

  constructor(dao: REPO) {
    this.repo = dao;
  }

  public async findPaginatedByCriteria(criteria: C): Promise<PaginatedList<T>> {
    const data = await  this.repo.findPaginatedByCriteria(criteria);
    const count = await this.repo.count();
    return new PaginatedList<T>(data, count);;
  }

  private async count(): Promise<number> {
    const result = await  this.repo.count();
    return result;
  }


  public async findByCriteria(criteria: C): Promise<T[]> {
    const result = await this.repo.findByCriteria(criteria);
    return result;

  }


}
