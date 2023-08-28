import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";
import {BaseCriteria} from "src/app/zynerator/criteria/BaseCriteria";

export class PurchaseCriteria extends BaseCriteria {
    reference: string;
    referenceLike: string;
    purchaseDate: Date;
    purchaseDateFrom: Date;
    purchaseDateTo: Date;
    image: string;
    imageLike: string;
    total: string;
    totalMin: string;
    totalMax: string;
    description: string;
    descriptionLike: string;
    client: ClientCriteria;
    clients: ClientCriteria[];

    constructor() { super();
        this.clients = [];
    }


}
