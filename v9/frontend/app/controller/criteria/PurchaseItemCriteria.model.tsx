import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {PurchaseCriteria} from './PurchaseCriteria.model';
import {ProductCriteria} from './ProductCriteria.model';




export class PurchaseItemCriteria  extends  BaseCriteria {

    public id: number;

     public price: null | number;
     public priceMin: null | number;
     public priceMax: null | number;
     public quantity: null | number;
     public quantityMin: null | number;
     public quantityMax: null | number;
  public product: ProductCriteria ;
  public products: Array<ProductCriteria> ;
  public purchase: PurchaseCriteria ;
  public purchases: Array<PurchaseCriteria> ;

    constructor() {
        super();
        this.price = null;
        this.priceMin = null;
        this.priceMax = null;
        this.quantity = null;
        this.quantityMin = null;
        this.quantityMax = null;
        this.product ;
        this.products = new Array<ProductCriteria>() ;
        this.purchase ;
        this.purchases = new Array<PurchaseCriteria>() ;
    }

}
