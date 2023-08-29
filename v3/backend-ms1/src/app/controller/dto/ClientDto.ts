import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";
import {AuditBaseDto} from "src/app/zynerator/audit/AuditBaseDto";


export class ClientDto extends AuditBaseDto {
    public id: number;
    public fullName: string;
    public email: string;

    public clientCategory: ClientCategoryDto;
}