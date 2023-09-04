import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {ClientCategoryDao} from "src/app/controller/dao/facade/core/ClientCategoryDao";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";
import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";


@Injectable()
export class ClientCategoryAdminServiceImpl extends AbstractServiceImpl<ClientCategory, ClientCategoryCriteria, ClientCategoryDao>{

    constructor(private readonly dao: ClientCategoryDao ,
    ) {
        super(dao);
    }

    async save(clientCategory: ClientCategory): Promise<ClientCategory> {
        const savedClientCategory = await this.dao.save(clientCategory);
        return savedClientCategory;
    }

    async  findAllOptimized(): Promise<ClientCategoryDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<ClientCategory[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<ClientCategory> {
        return this.dao.findById(id);
    }

    async delete(clientCategory: ClientCategory): Promise<ClientCategory> {
        const existingClientCategory = await this.findWithAssociatedLists(clientCategory.id);
        if (!existingClientCategory) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Client category with ID ${clientCategory.id} not found.`);
        }
        await this.dao.deleteById(existingClientCategory.id);
        return existingClientCategory;
    }

    async deleteMultiple(clientCategorys: ClientCategory[]): Promise<ClientCategory[]> {
        const deletedClientCategorys: ClientCategory[] = [];
        for (const clientCategory of clientCategorys) {
            const deletedClientCategory = await this.delete(clientCategory);
            deletedClientCategorys.push(deletedClientCategory);
        }
        return deletedClientCategorys;
    }


    async findWithAssociatedLists(id: number): Promise<ClientCategory> {
        const result = await this.dao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

