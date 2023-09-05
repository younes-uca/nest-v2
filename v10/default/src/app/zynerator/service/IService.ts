import { BusinessObject } from "../bean/BusinessObject";
import { BaseCriteria } from "../criteria/BaseCriteria";

export interface IService<T extends BusinessObject, Criteria extends BaseCriteria> {

    create(t: T): T;

    update(t: T): T;

    update(ts: T[], createIfNotExist: boolean): T[];

    findById(id: number): T;

    findOrSave(t: T): T;

    findOrSaveAssociatedObject(t: T): void;

    findByReferenceEntity(t: T): T;

    findWithAssociatedLists(id: number): T;

    deleteWithAssociatedLists(t: T): void;

    findByCriteria(criteria: Criteria): T[];

    findAllOptimized(): T[];

    findPaginatedByCriteria(criteria: Criteria, page: number, pageSize: number, order: string, sortField: string): T[];

    getDataSize(criteria: Criteria): number;

    delete(ts: T[]): void;

    deleteByIdIn(ids: number[]): void;

    deleteById(id: number): void;

    getToBeSavedAndToBeDeleted(oldList: T[], newList: T[]): [T[], T[]];


}
