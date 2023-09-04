import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {ClientCategoryCriteria} from './ClientCategoryCriteria.model';




export class ClientCriteria  extends  BaseCriteria {

    public id: number;

    public fullName: string;
    public fullNameLike: string;
  public clientCategory: ClientCategoryCriteria ;
  public clientCategorys: Array<ClientCategoryCriteria> ;

    constructor() {
        super();
        this.fullName = '';
        this.fullNameLike = '';
        this.clientCategory ;
        this.clientCategorys = new Array<ClientCategoryCriteria>() ;
    }

}
