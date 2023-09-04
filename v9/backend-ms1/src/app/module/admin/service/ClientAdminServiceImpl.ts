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

    async deleteById(id: number): Promise<void> {
        return this.dao.deleteById(id);
    }

    async delete(client: Client): Promise<Client> {
        const existingClient = await this.findWithAssociatedLists(client.id);
        if (!existingClient) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Client with ID ${client.id} not found.`);
        }
        await this.dao.deleteById(existingClient.id);
        return existingClient;
    }

    async deleteMultiple(clients: Client[]): Promise<Client[]> {
        const deletedClients: Client[] = [];
        for (const client of clients) {
            const deletedClient = await this.delete(client);
            deletedClients.push(deletedClient);
        }
        return deletedClients;
    }

    async findByClientCategoryId(id: number): Promise<Client[]> {
        return this.dao.findByClientCategoryId(id);
    }

    async findWithAssociatedLists(id: number): Promise<Client> {
        const result = await this.dao.findById(id);
    return result;
    }

    async updateWithAssociatedLists(item: Client): Promise<Client> {
         return await this.dao.saveOrUpdate(item);
    }


}

