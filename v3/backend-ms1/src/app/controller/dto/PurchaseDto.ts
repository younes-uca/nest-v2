import {ProductDto} from "src/app/controller/dto/ProductDto";
import {ClientDto} from "src/app/controller/dto/ClientDto";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {AuditBaseDto} from "src/app/zynerator/audit/AuditBaseDto";


export class PurchaseDto extends AuditBaseDto{
    public id: number;
    public reference: string;
    public purchaseDate: Date;
    public image: string;
    public total: number;
    public description: string;

    public client: ClientDto;
    public purchaseItems: PurchaseItemDto[];
}