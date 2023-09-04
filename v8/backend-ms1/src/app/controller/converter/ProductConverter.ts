import {Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Product} from "src/app/controller/bean/core/Product";
import {ProductDto} from "src/app/controller/dto/ProductDto";


@Injectable()
export class ProductConverter extends AbstractConverter<Product, ProductDto> {


    constructor() {
        super();
        this.init(true);
    }

    toItem(dto: ProductDto): Product {
        if (!dto) {
            return null;
        }
        const item = new Product();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.code) {
            item.code = dto.code;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }


        return item;
    }

    toDto(item: Product): ProductDto {
        if (!item) {
            return null;
        }
        const dto = new ProductDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.code) {
            dto.code = item.code;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }


        return dto;
    }


    public initObject(value: boolean): void {
    }
}