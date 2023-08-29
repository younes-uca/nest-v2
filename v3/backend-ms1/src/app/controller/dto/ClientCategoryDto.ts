import {AuditBaseDto} from "src/app/zynerator/audit/AuditBaseDto";

export class ClientCategoryDto extends AuditBaseDto {
    public id: number;
    public reference: string;
    public code: string;

}