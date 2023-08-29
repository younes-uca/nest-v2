import {AuditBaseDto} from "src/app/zynerator/audit/AuditBaseDto";


export class ProductDto extends AuditBaseDto{
    public id: number;
    public code: string;
    public reference: string;

}