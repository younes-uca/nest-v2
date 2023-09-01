import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";
import {PurchaseItemCriteria} from "src/app/controller/dao/criteria/core/PurchaseItemCriteria";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";


export class PurchaseCriteria extends  BaseCriteria  {

    public reference: string;
    public referenceLike: string;
    public purchaseDate: Date;
    public purchaseDateFrom: Date;
    public purchaseDateTo: Date;
    public image: string;
    public imageLike: string;
    public total: string;
    public totalMin: string;
    public totalMax: string;

    public client: ClientCriteria;
    public clients: Array<ClientCriteria>;

    public constructor(){
        super();
    }
}
