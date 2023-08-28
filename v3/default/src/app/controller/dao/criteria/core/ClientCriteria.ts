import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";

export class ClientCriteria extends BaseCriteria {
    fullName: string;
    fullNameLike: string;
    email: string;
    emailLike: string;

    constructor() {super();}
}
