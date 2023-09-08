import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {Client} from "src/app/controller/bean/core/Client";
import {ClientDto} from "src/app/controller/dto/ClientDto";

import {ClientCategoryConverter} from "src/app/controller/converter/ClientCategoryConverter";

@Injectable()
export class ClientConverter extends AbstractConverter<Client, ClientDto> {

    clientCategory: boolean;

    constructor(
        @Inject(forwardRef(() => ClientCategoryConverter)) readonly clientCategoryConverter: ClientCategoryConverter,
        ) {
            super();
            this.init(true);
    }

    toItem(dto: ClientDto): Client {
        if (!dto) {
            return null;
        }
        const item =new Client();
        if (dto.id) {
            item.id = dto.id;
        }
        if (dto.fullName) {
            item.fullName = dto.fullName;
        }
        if (dto.credentialsNonExpired) {
            item.credentialsNonExpired = dto.credentialsNonExpired;
        }
        if (dto.enabled) {
            item.enabled = dto.enabled;
        }
        if (dto.accountNonExpired) {
            item.accountNonExpired = dto.accountNonExpired;
        }
        if (dto.accountNonLocked) {
            item.accountNonLocked = dto.accountNonLocked;
        }
        if (dto.passwordChanged) {
            item.passwordChanged = dto.passwordChanged;
        }
        if (dto.username) {
            item.username = dto.username;
        }
        if (dto.password) {
            item.password = dto.password;
        }
        if (this.clientCategory && dto.clientCategory?.id) {
            item.clientCategory = this.clientCategoryConverter.toItem(dto.clientCategory);
        }


        if(this.clientCategory && dto.clientCategory &&  dto.clientCategory.id)
            item.clientCategory = this.clientCategoryConverter.toItem(dto.clientCategory) ;



        item.role = dto.role;
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
        if (item.credentialsNonExpired) {
            dto.credentialsNonExpired = item.credentialsNonExpired;
        }
        if (item.enabled) {
            dto.enabled = item.enabled;
        }
        if (item.accountNonExpired) {
            dto.accountNonExpired = item.accountNonExpired;
        }
        if (item.accountNonLocked) {
            dto.accountNonLocked = item.accountNonLocked;
        }
        if (item.passwordChanged) {
            dto.passwordChanged = item.passwordChanged;
        }
        if (item.username) {
            dto.username = item.username;
        }
        if (item.password) {
            dto.password = item.password;
        }
        if(this.clientCategory && item.clientCategory) {
            dto.clientCategory = this.clientCategoryConverter.toDto(item.clientCategory) ;
        dto.role = item.role;
    }


        return dto;
    }



    public initObject(value: boolean): void {
        this.clientCategory = value;
    }
}