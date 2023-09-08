import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";


export class ClientCriteria extends  BaseCriteria  {

    public fullName: string;
    public fullNameLike: string;
    public credentialsNonExpired: boolean ;
    public enabled: boolean ;
    public accountNonExpired: boolean ;
    public accountNonLocked: boolean ;
    public passwordChanged: boolean ;
    public username: string;
    public usernameLike: string;
    public password: string;
    public passwordLike: string;

    public clientCategory: ClientCategoryCriteria;
    public clientCategorys: Array<ClientCategoryCriteria>;

    public constructor(){
        super();
    }
}
