import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";
import {PaginatedList} from "../util/PaginatedList";
import {AuditBusinessObject} from "../audit/AuditBusinessObject";

export class AbstractServiceImpl<T extends AuditBusinessObject, C extends BaseCriteria, REPO extends AbstractRepository<T, C>> {

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

  getToBeSavedAndToBeDeleted<T>(oldList: T[], newList: T[]): [T[], T[]] {
    const result: [T[], T[]] = [[], []];
    const resultDelete: T[] = [];
    const resultUpdateOrSave: T[] = [];

    if (oldList.length === 0 && newList.length > 0) {
      resultUpdateOrSave.push(...newList);
    } else if (oldList.length > 0 && newList.length === 0) {
      resultDelete.push(...oldList);
    } else if (oldList.length > 0 && newList.length > 0) {
      for (let i = 0; i < oldList.length; i++) {
        const myOld = oldList[i];
        const t = newList.find((e) => (<AuditBusinessObject>myOld).id === (<AuditBusinessObject>e).id);

        if (t !== undefined) {
          resultUpdateOrSave.push(t);
        } else {
          resultDelete.push(myOld);
        }
      }

      for (let i = 0; i < newList.length; i++) {
        const myNew = newList[i];
        const t = oldList.find((e) => (<AuditBusinessObject>myNew).id === (<AuditBusinessObject>e).id);

        if (t === undefined) {
          resultUpdateOrSave.push(myNew);
        }
      }
    }

    result[0] = resultUpdateOrSave;
    result[1] = resultDelete;

    return result;
  }


}
