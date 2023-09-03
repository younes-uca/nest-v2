import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {PurchaseItemCriteria} from './PurchaseItemCriteria.model';
import {ClientCriteria} from './ClientCriteria.model';




export class PurchaseCriteria  extends  BaseCriteria {

    public id: number;

    public reference: string;
    public referenceLike: string;
    public purchaseDate: Date;
    public purchaseDateFrom: Date;
    public purchaseDateTo: Date;
    public image: string;
    public imageLike: string;
    public etat: null | boolean;
     public total: null | number;
     public totalMin: null | number;
     public totalMax: null | number;
    public description: string;
    public descriptionLike: string;
  public client: ClientCriteria ;
  public clients: Array<ClientCriteria> ;
      public purchaseItems: Array<PurchaseItemCriteria>;

    constructor() {
        super();
        this.reference = '';
        this.referenceLike = '';
        this.purchaseDate = null;
        this.purchaseDateFrom  = null;
        this.purchaseDateTo = null;
        this.image = '';
        this.imageLike = '';
        this.etat = null;
        this.total = null;
        this.totalMin = null;
        this.totalMax = null;
        this.description = '';
        this.descriptionLike = '';
        this.client ;
        this.clients = new Array<ClientCriteria>() ;
    }

}
