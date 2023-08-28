import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";

export class PurchaseItemCriteria extends BaseCriteria {
    price: string;
    priceMin: string;
    priceMax: string;
    quantity: string;
    quantityMin: string;
    quantityMax: string;
    product: ProductCriteria;
    products: ProductCriteria[];
    purchase: PurchaseCriteria;
    purchases: PurchaseCriteria[];

    constructor() { super();
        this.products = [];
        this.purchases = [];
    }


}
