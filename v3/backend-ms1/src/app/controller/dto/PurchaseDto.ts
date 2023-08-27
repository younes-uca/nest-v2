import {ProductDto} from "src/app/controller/dto/ProductDto";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {ClientDto} from "src/app/controller/dto/ClientDto";

export class PurchaseDto {
    public id: number;
    public reference: string;
    public purchaseDate: Date;
    public image: string;
    public total: number;
    public description: string;

    public client: ClientDto;
    public purchaseItems: PurchaseItemDto[];
}