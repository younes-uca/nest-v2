import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";
import {ProductDto} from "src/app/controller/dto/ProductDto";

export class PurchaseItemDto {
    public id: number;
    public price: number;
    public quantity: number;

    public product: ProductDto;
    public purchase: PurchaseDto;

    constructor(id?: number) {
        this.id = id;
    }

}