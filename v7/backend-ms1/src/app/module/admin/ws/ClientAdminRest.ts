import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ClientConverter} from "src/app/controller/converter/ClientConverter";
import {ClientAdminServiceImpl} from "src/app/module/admin/service/ClientAdminServiceImpl";
import {ClientDto} from "src/app/controller/dto/ClientDto";
import {ClientCriteria} from "src/app/controller/dao/criteria/core/ClientCriteria";


@ApiTags('Manages client services')
@Controller('api/admin/client')
export class ClientAdminRest {

    constructor(private readonly service: ClientAdminServiceImpl,
                private readonly converter: ClientConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all clients'})
    @Get()
    async findAll(): Promise<ClientDto[]> {
        const clients = await this.service.findAll();
        return this.converter.toDtos(clients);
    }

    @ApiOperation({summary: 'Finds a client by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ClientDto> {
        const client = await this.service.findById(id);
        return this.converter.toDto(client);
    }

    @ApiOperation({summary: 'Saves the specified client'})
    @Post()
    async save(@Body() dto: ClientDto): Promise<ClientDto> {
        const client = this.converter.toItem(dto);
        const savedClient = await this.service.save(client);
        return this.converter.toDto(savedClient);
    }


    /*@ApiOperation({summary: 'Updates the specified client'})
    @Put()
    async update(@Body() dto: ClientDto): Promise<ClientDto> {
        const client = this.converter.toItem(dto);
        const updatedClient = await this.service.update(client);
        return this.converter.toDto(updatedClient);
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Get('optimized')
    async findAllOptimized(): Promise<ClientDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ClientCriteria): Promise<ClientDto[]> {
        const clients = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(clients);
    }

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ClientCriteria): Promise<PaginatedList<ClientDto>> {
        const clients = await this.service.findPaginatedByCriteria(criteria);
        const clientDtos = this.converter.toDtos(clients);
        return new PaginatedList<ClientDto>(clientDtos, clientDtos.length);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ClientDto> {
        const client = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(client);
    }

    @Get('clientCategory/id/:id')
    async findByClientCategoryId(@Param('id') id: number): Promise<ClientDto[]> {
        const clients = await this.service.findByClientCategoryId(id);
        return this.converter.toDtos(clients);
    }

    @Delete()
    async delete(@Body() dto: ClientDto): Promise<ClientDto> {
        const client = this.converter.toItem(dto);
        const deletedClient = await this.service.delete(client);
        return this.converter.toDto(deletedClient);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ClientDto[]): Promise<ClientDto[]> {
        const clients = dtos.map(dto => this.converter.toItem(dto));
        const deletedClients = await this.service.deleteMultiple(clients);
        return deletedClients.map(client => this.converter.toDto(client));
    }

}