import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {ClientCategoryDto} from 'app/controller/model/ClientCategory.model';

import {RoleDto} from "app/zynerator/dto/RoleDto.model";
export class ClientDto extends BaseDto{

    public fullName: string;

   public credentialsNonExpired: boolean;

   public enabled: boolean;

   public accountNonExpired: boolean;

   public accountNonLocked: boolean;

   public passwordChanged: boolean;

    public username: string;

    public password: string;

    public clientCategory: ClientCategoryDto ;

    public roles: RoleDto[];

    constructor() {
        super();
        this.fullName = '';
        this.credentialsNonExpired = null;
        this.enabled = null;
        this.accountNonExpired = null;
        this.accountNonLocked = null;
        this.passwordChanged = null;
        this.username = '';
        this.password = '';
        this.clientCategory;
        }

    getClassName() {
        return "Client";
    }
}
