import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";

export class ClientCriteria extends BaseCriteria {
    fullName: string;
    fullNameLike: string;
    email: string;
    emailLike: string;
    clientCategory: ClientCategoryCriteria;
    clientCategorys: ClientCategoryCriteria[];

    constructor() { super();
        this.clientCategorys = [];
    }
}
