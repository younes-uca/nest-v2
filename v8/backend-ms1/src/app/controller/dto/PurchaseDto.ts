import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {ClientDto} from "src/app/controller/dto/ClientDto";
import {ProductDto} from "src/app/controller/dto/ProductDto";

export class PurchaseDto {
    public id: number;
    public reference: string;
    public purchaseDate: Date;
    public image: string;
    public etat: boolean;
    public total: number;
    public description: string;

    public client: ClientDto;
    public purchaseItems: PurchaseItemDto[];

    constructor(id?: number, reference?: string) {
        this.id = id;
        this.reference = reference;
    }

}