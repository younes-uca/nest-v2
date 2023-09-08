import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {ProductDto} from 'app/controller/model/Product.model';
import {ProductCriteria} from 'app/controller/criteria/ProductCriteria.model';

export class ProductAdminService extends AbstractService<ProductDto, ProductCriteria>{

    constructor() {
        super(ADMIN_URL , 'product/');
    }

};