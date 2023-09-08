import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {ClientCategoryCriteria} from './ClientCategoryCriteria.model';




export class ClientCriteria  extends  BaseCriteria {

    public id: number;

    public fullName: string;
    public fullNameLike: string;
    public credentialsNonExpired: null | boolean;
    public enabled: null | boolean;
    public accountNonExpired: null | boolean;
    public accountNonLocked: null | boolean;
    public passwordChanged: null | boolean;
    public username: string;
    public usernameLike: string;
    public password: string;
    public passwordLike: string;
  public clientCategory: ClientCategoryCriteria ;
  public clientCategorys: Array<ClientCategoryCriteria> ;

    constructor() {
        super();
        this.fullName = '';
        this.fullNameLike = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.usernameLike = '';
        this.password = '';
        this.passwordLike = '';
        this.clientCategory ;
        this.clientCategorys = new Array<ClientCategoryCriteria>() ;
    }

}
