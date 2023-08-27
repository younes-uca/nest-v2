import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {PurchaseItemDto} from 'app/controller/model/PurchaseItem.model';
import {ClientDto} from 'app/controller/model/Client.model';

export class PurchaseDto extends BaseDto{

    public reference: string;

   public purchaseDate: Date;

    public image: string;

    public total: null | number;

    public description: string;

    public client: ClientDto ;
     public purchaseItems: Array<PurchaseItemDto>;


    constructor() {
        super();
        this.reference = '';
        this.purchaseDate = null;
        this.image = '';
        this.total = null;
        this.description = '';
        this.client;
        this.purchaseItems = new Array<PurchaseItemDto>();
        }

    getClassName() {
        return "Purchase";
    }
}
