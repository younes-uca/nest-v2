import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {PurchaseItemDto} from 'app/controller/model/PurchaseItem.model';
import {PurchaseItemCriteria} from 'app/controller/criteria/PurchaseItemCriteria.model';

export class PurchaseItemAdminService extends AbstractService<PurchaseItemDto, PurchaseItemCriteria>{

    constructor() {
        super(ADMIN_URL , 'purchaseItem/');
    }

};