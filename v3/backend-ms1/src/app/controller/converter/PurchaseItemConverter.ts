import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";

import {ProductConverter} from "src/app/controller/converter/ProductConverter";
import {PurchaseConverter} from "src/app/controller/converter/PurchaseConverter";

@Injectable()
export class PurchaseItemConverter extends AbstractConverter<PurchaseItem, PurchaseItemDto> {

    product: boolean;
    purchase: boolean;
    constructor(
        @Inject(forwardRef(() => ProductConverter)) private readonly productConverter: ProductConverter,
        @Inject(forwardRef(() => PurchaseConverter)) private readonly purchaseConverter: PurchaseConverter,
        ) { super();
    }

    toItem(dto: PurchaseItemDto): PurchaseItem {
        if (!dto) {
            return null;
        }
        const item = new PurchaseItem();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.price) {
            item.price = dto.price;
        }
        if (dto.quantity) {
            item.quantity = dto.quantity;
        }
        if (this.product && dto.product?.id) {
            item.product = this.productConverter.toItem(dto.product);
        }
        if (this.purchase && dto.purchase?.id) {
            item.purchase = this.purchaseConverter.toItem(dto.purchase);
        }
        return item;
    }

    toDto(item: PurchaseItem): PurchaseItemDto {
        if (!item) {
            return null;
        }
        const dto = new PurchaseItemDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.price) {
            dto.price = item.price;
        }
        if (item.quantity) {
            dto.quantity = item.quantity;
        }
        if (this.product && item.product) {
            dto.product = this.productConverter.toDto(item.product);
        }
        if (this.purchase && item.purchase) {
            dto.purchase = this.purchaseConverter.toDto(item.purchase);
        }
        return dto;
    }

}