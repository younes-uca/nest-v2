import {Injectable, NotFoundException} from "@nestjs/common";

import {ClientDao} from "src/app/controller/dao/facade/core/ClientDao";
import {Client} from "src/app/controller/bean/core/Client";


@Injectable()
export class ClientAdminServiceImpl  {

    constructor(private readonly clientDao: ClientDao,
    ) {}

    async save(client: Client): Promise<Client> {
        const savedClient = await this.clientDao.save(client);
        return savedClient;
    }

    async findAll(): Promise<Client[]> {
        return this.clientDao.findAll();
    }

    async findById(id: number): Promise<Client> {
        return this.clientDao.findById(id);
    }

    async delete(client: Client): Promise<Client> {
        const existingClient = await this.findWithAssociatedLists(client.id);
        if (!existingClient) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`Client with ID ${client.id} not found.`);
        }
        await this.clientDao.deleteById(existingClient.id);
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
        return this.clientDao.findByClientCategoryId(id);
    }

    async findWithAssociatedLists(id: number): Promise<Client> {
        const result = await this.clientDao.findById(id);
        if (result && result.id) {
        }
        return result;
    }

}

