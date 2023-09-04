import {BusinessObject} from "src/app/zynerator/bean/BusinessObject";


export class AuditBusinessObject extends BusinessObject {
    public createdOn: Date;
    public updatedOn: Date;
    public createdBy: string;
    public updatedBy: string;

    constructor() {
        super();
    }


}

