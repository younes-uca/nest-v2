import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";


@Injectable()
export class ClientCategoryConverter extends AbstractConverter<ClientCategory, ClientCategoryDto> {


    constructor(
        ) {
            super();
    }

    toItem(dto: ClientCategoryDto): ClientCategory {
        if (!dto) {
            return null;
        }
        const item =new ClientCategory();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.reference) {
            item.reference = dto.reference;
        }
        if (dto.code) {
            item.code = dto.code;
        }




        return item;
    }

    toDto(item: ClientCategory): ClientCategoryDto {
        if (!item) {
            return null;
        }
        const dto = new ClientCategoryDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.reference) {
            dto.reference = item.reference;
        }
        if (item.code) {
            dto.code = item.code;
        }


        return dto;
    }



    public initObject(value: boolean): void {
    }
}