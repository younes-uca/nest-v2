import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";

export class ClientDto {
    public id: number;
    public fullName: string;
    public email: string;

    public clientCategory: ClientCategoryDto;


    constructor(id?: number, email?: string) {
        this.id = id;
        this.email = email;
    }
}