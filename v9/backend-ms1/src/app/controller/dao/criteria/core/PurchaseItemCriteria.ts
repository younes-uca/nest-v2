import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";


export class PurchaseItemCriteria extends  BaseCriteria  {

    public price: string;
    public priceMin: string;
    public priceMax: string;
    public quantity: string;
    public quantityMin: string;
    public quantityMax: string;

    public product: ProductCriteria;
    public products: Array<ProductCriteria>;
    public purchase: PurchaseCriteria;
    public purchases: Array<PurchaseCriteria>;

    public constructor(){
        super();
    }
}
