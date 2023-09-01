import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";


export class ProductCriteria extends  BaseCriteria  {

    public code: string;
    public codeLike: string;
    public reference: string;
    public referenceLike: string;


    public constructor(){
        super();
    }
}
