import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {PurchaseDto} from 'app/controller/model/Purchase.model';
import {ProductDto} from 'app/controller/model/Product.model';

export class PurchaseItemDto extends BaseDto{

    public price: null | number;

    public quantity: null | number;

    public product: ProductDto ;
    public purchase: PurchaseDto ;


    constructor() {
        super();
        this.price = null;
        this.quantity = null;
        this.product;
        this.purchase;
        }

    getClassName() {
        return "Purchase item";
    }
}
