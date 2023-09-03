import {BaseDto} from 'app/zynerator/dto/BaseDto.model';

import {ClientCategoryDto} from 'app/controller/model/ClientCategory.model';

export class ClientDto extends BaseDto{

    public fullName: string;

    public clientCategory: ClientCategoryDto ;


    constructor() {
        super();
        this.fullName = '';
        this.clientCategory;
        }

    getClassName() {
        return "Client";
    }
}
