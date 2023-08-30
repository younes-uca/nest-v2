import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";

export class ClientDto {
    public id: number;
    public fullName: string;
    public email: string;

    public clientCategory: ClientCategoryDto;
}