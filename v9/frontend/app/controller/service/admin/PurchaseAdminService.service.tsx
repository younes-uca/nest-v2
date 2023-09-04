import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {PurchaseDto} from 'app/controller/model/Purchase.model';
import {PurchaseCriteria} from 'app/controller/criteria/PurchaseCriteria.model';

export class PurchaseAdminService extends AbstractService<PurchaseDto, PurchaseCriteria>{

    constructor() {
        super(ADMIN_URL , 'purchase/');
    }

};