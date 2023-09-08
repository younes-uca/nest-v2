import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";

import {Role} from "src/app/module/auth/bean/Role";
export class ClientDto {
    public id: number;
    public fullName: string;
    public credentialsNonExpired: boolean;
    public enabled: boolean;
    public accountNonExpired: boolean;
    public accountNonLocked: boolean;
    public passwordChanged: boolean;
    public username: string;
    public password: string;

    public clientCategory: ClientCategoryDto;

    constructor(id?: number, fullName?: string) {
        this.id = id;
        this.fullName = fullName;
    }

    role: Role;


}