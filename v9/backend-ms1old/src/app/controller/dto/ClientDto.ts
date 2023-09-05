import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";

export class ClientDto {
    public id: number;
    public fullName: string;

    public clientCategory: ClientCategoryDto;

    constructor(id?: number, fullName?: string) {
        this.id = id;
        this.fullName = fullName;
    }

}