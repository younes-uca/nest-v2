import {BusinessObject} from "src/app/zynerator/bean/BusinessObject";


export class AuditBusinessObject extends BusinessObject {
    createdOn: Date;
    updatedOn: Date;
    createdBy: string;
    updatedBy: string;

    constructor() {
        super();
    }


}

