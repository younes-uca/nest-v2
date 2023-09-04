import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {ClientCategoryDto} from 'app/controller/model/ClientCategory.model';
import {ClientCategoryCriteria} from 'app/controller/criteria/ClientCategoryCriteria.model';

export class ClientCategoryAdminService extends AbstractService<ClientCategoryDto, ClientCategoryCriteria>{

    constructor() {
        super(ADMIN_URL , 'clientCategory/');
    }

};