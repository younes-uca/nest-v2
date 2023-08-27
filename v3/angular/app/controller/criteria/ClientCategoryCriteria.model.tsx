import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';





export class ClientCategoryCriteria  extends  BaseCriteria {

    public id: number;

    public reference: string;
    public referenceLike: string;
    public code: string;
    public codeLike: string;

    constructor() {
        super();
        this.reference = '';
        this.referenceLike = '';
        this.code = '';
        this.codeLike = '';
    }

}
