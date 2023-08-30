import {Injectable, NotFoundException} from "@nestjs/common";

import {ClientCategoryDao} from "src/app/controller/dao/facade/core/ClientCategoryDao";
import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";


@Injectable()
export class ClientCategoryAdminServiceImpl  {

    constructor(private readonly clientCategoryDao: ClientCategoryDao,
    ) {}

    async save(clientCategory: ClientCategory): Promise<ClientCategory> {
        const savedClientCategory = await this.clientCategoryDao.save(clientCategory);
        return savedClientCategory;
    }

    async findAll(): Promise<ClientCategory[]> {
        return this.clientCategoryDao.findAll();
    }

    async findById(id: number): Promise<ClientCategory> {
        return this.clientCategoryDao.findById(id);
    }

    async delete(clientCategory: ClientCategory): Promise<ClientCategory> {
        const existingClientCategory = await this.findWithAssociatedLists(clientCategory.id);
        if (!existingClientCategory) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Client category with ID ${clientCategory.id} not found.`);
        }
        await this.clientCategoryDao.deleteById(existingClientCategory.id);
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
        const result = await this.clientCategoryDao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

