import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {ClientDao} from "src/app/controller/dao/facade/core/ClientDao";
import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";
import {Client} from "src/app/controller/bean/core/Client";
import {ClientDto} from "src/app/controller/dto/ClientDto";


@Injectable()
export class ClientAdminServiceImpl extends AbstractServiceImpl<Client, ClientCriteria, ClientDao>{

    constructor(private readonly dao: ClientDao ,
    ) {
        super(dao);
    }

    async save(item: Client): Promise<Client> {
        const saved = await this.dao.save(item);
        return saved;
    }


    async update(item: Client): Promise<Client> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: Client[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<ClientDto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<Client[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<Client> {
        return this.dao.findById(id);
    }


    async deleteById(id: number): Promise<number> {
        const existing = await this.findById(id);
        if (!existing) {
            throw new NotFoundException(`Client with ID ${id} not found.`);
        }
        const result = await this.dao.deleteById(existing.id);
        return result;
    }

    async deleteMultiple(items: Client[]): Promise<Client[]> {
        const deletedItems: Client[] = [];
        for (const item of items) {
            await this.deleteById(item.id);
            deletedItems.push(item);
        }
        return deletedItems;
    }

    async findByClientCategoryId(id: number): Promise<Client[]> {
        return this.dao.findByClientCategoryId(id);
    }

    async deleteByClientCategoryId(id: number): Promise<number> {
        return this.dao.deleteByClientCategoryId(id);
    }

    async findWithAssociatedLists(id: number): Promise<Client> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: Client): Promise<Client> {
         return await this.dao.saveOrUpdate(item);
    }
}

