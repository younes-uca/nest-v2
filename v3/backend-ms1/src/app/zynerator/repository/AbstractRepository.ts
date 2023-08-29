import {AuditBusinessObject} from 'src/app/zynerator/audit/AuditBusinessObject';
import {Repository} from "typeorm";

export class AbstractRepository<T extends AuditBusinessObject> extends Repository<T>{


}
