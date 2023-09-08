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
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a client by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ClientDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a client by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified client'})
    @Post()
    async save(@Body() dto: ClientDto): Promise<ClientDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified client'})
    @Put()
    async update(@Body() dto: ClientDto): Promise<ClientDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Get('optimized')
    async findAllOptimized(): Promise<ClientDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ClientCriteria): Promise<ClientDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all clients'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ClientCriteria): Promise<PaginatedList<ClientDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ClientDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ClientDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

    @Get('clientCategory/id/:id')
    async findByClientCategoryId(@Param('id') id: number): Promise<ClientDto[]> {
        const items = await this.service.findByClientCategoryId(id);
        return this.converter.toDtos(items);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ClientDto[]): Promise<ClientDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}