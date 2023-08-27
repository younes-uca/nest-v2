import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Client} from "src/app/controller/bean/core/Client";
import {ClientDto} from "src/app/controller/dto/ClientDto";

import {ClientCategoryConverter} from "src/app/controller/converter/ClientCategoryConverter";

@Injectable()
export class ClientConverter extends AbstractConverter<Client, ClientDto> {

    constructor(
        @Inject(forwardRef(() => ClientCategoryConverter)) private readonly clientCategoryConverter: ClientCategoryConverter,
        ) { super();
    }

    toItem(dto: ClientDto): Client {
        if (!dto) {
            return null;
        }
        const item = new Client();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.fullName) {
            item.fullName = dto.fullName;
        }
        if (dto.email) {
            item.email = dto.email;
        }
        if (dto.clientCategory?.id) {
            item.clientCategory = this.clientCategoryConverter.toItem(dto.clientCategory);
        }
        return item;
    }

    toDto(item: Client): ClientDto {
        if (!item) {
            return null;
        }
        const dto = new ClientDto();

        if (item.id) {
            dto.id = item.id;
        }
        if (item.fullName) {
            dto.fullName = item.fullName;
        }
        if (item.email) {
            dto.email = item.email;
        }
        if (item.clientCategory) {
            dto.clientCategory = this.clientCategoryConverter.toDto(item.clientCategory);
        }
        return dto;
    }

}