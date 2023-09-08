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

    async save(item: ClientCategory): Promise<ClientCategory> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: ClientCategory): Promise<ClientCategory> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: ClientCategory[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
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


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Client category with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: ClientCategory[]): Promise<ClientCategory[]> {
        const deletedItems: ClientCategory[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }


    async findWithAssociatedLists(id: number): Promise<ClientCategory> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: ClientCategory): Promise<ClientCategory> {
         return await this.dao.saveOrUpdate(item);
    }
}

