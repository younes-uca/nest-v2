import {ProductDto} from "src/app/controller/dto/ProductDto";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";
import {AuditBaseDto} from "src/app/zynerator/audit/AuditBaseDto";

export class PurchaseItemDto extends AuditBaseDto{
    public id: number;
    public price: number;
    public quantity: number;

    public product: ProductDto;
    public purchase: PurchaseDto;
}