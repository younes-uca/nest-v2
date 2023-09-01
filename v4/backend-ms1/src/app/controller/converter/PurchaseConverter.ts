import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";

import {ClientConverter} from "src/app/controller/converter/ClientConverter";
import {PurchaseItemConverter} from "src/app/controller/converter/PurchaseItemConverter";
import {ProductConverter} from "src/app/controller/converter/ProductConverter";

@Injectable()
export class PurchaseConverter extends AbstractConverter<Purchase, PurchaseDto> {

    client: boolean;
    purchaseItems: boolean;

    constructor(
        @Inject(forwardRef(() => ClientConverter)) readonly clientConverter: ClientConverter,
        @Inject(forwardRef(() => PurchaseItemConverter)) readonly purchaseItemConverter: PurchaseItemConverter,
        @Inject(forwardRef(() => ProductConverter)) readonly productConverter: ProductConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: PurchaseDto): Purchase {
        if (!dto) {
            return null;
        }
        const item =new Purchase();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.purchaseDate) {
            item.purchaseDate = dto.purchaseDate;
        }
        if (dto.image) {
            item.image = dto.image;
        }
        if (dto.total) {
            item.total = dto.total;
        }
        if (dto.description) {
            item.description = dto.description;
        }
        if (this.client && dto.client?.id) {
            item.client = this.clientConverter.toItem(dto.client);
        }


        if(this.client && dto.client &&  dto.client.id)
            item.client = this.clientConverter.toItem(dto.client) ;

        if (this.purchaseItems && dto.purchaseItems?.length > 0) {
            item.purchaseItems = this.purchaseItemConverter.toItems(dto.purchaseItems);
        }


        if (this.purchaseItems && dto.purchaseItems?.length > 0) {
            item.purchaseItems = this.purchaseItemConverter.toItems(dto.purchaseItems);
        }

        return item;
    }

    toDto(item: Purchase): PurchaseDto {
        if (!item) {
            return null;
        }
        const dto = new PurchaseDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.purchaseDate) {
            dto.purchaseDate = item.purchaseDate;
        }
        if (item.image) {
            dto.image = item.image;
        }
        if (item.total) {
            dto.total = item.total;
        }
        if (item.description) {
            dto.description = item.description;
        }
        if(this.client && item.client) {
            dto.client = this.clientConverter.toDto(item.client) ;
    }
        if (item.purchaseItems?.length > 0) {
            dto.purchaseItems = this.purchaseItemConverter.toDtos(item.purchaseItems);
        }

        if(this.purchaseItems && item.purchaseItems?.length > 0){
            this.purchaseItemConverter.init(true);
            this.purchaseItemConverter.purchase = false;
            dto.purchaseItems = this.purchaseItemConverter.toDtos(item.purchaseItems);
            this.purchaseItemConverter.purchase = true;
        }

        return dto;
    }


    public initList(value: boolean): void {
            this.purchaseItems = value;
    }

    public initObject(value: boolean): void {
        this.client = value;
    }
}