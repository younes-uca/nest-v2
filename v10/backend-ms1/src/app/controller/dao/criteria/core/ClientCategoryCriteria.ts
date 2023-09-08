import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";


export class ClientCategoryCriteria extends  BaseCriteria  {

    public reference: string;
    public referenceLike: string;
    public code: string;
    public codeLike: string;


    public constructor(){
        super();
    }
}
