import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {ClientDto} from 'app/controller/model/Client.model';
import {ClientCriteria} from 'app/controller/criteria/ClientCriteria.model';

export class ClientAdminService extends AbstractService<ClientDto, ClientCriteria>{

    constructor() {
        super(ADMIN_URL , 'client/');
    }

};