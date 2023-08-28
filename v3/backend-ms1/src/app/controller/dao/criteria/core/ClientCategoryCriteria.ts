import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";

export class ClientCategoryCriteria extends BaseCriteria {
    code: string;
    codeLike: string;
    reference: string;
    referenceLike: string;

    constructor() {super();}
}
