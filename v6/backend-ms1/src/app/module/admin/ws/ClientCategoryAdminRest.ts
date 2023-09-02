import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ClientCategoryConverter} from "src/app/controller/converter/ClientCategoryConverter";
import {ClientCategoryAdminServiceImpl} from "src/app/module/admin/service/ClientCategoryAdminServiceImpl";
import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";
import {ClientCategoryCriteria} from "../../../controller/dao/criteria/core/ClientCategoryCriteria";


@ApiTags('Manages client category services')
@Controller('api/admin/clientCategory')
export class ClientCategoryAdminRest {

    constructor(private readonly service: ClientCategoryAdminServiceImpl,
                private readonly converter: ClientCategoryConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all clientCategorys'})
    @Get()
    async findAll(): Promise<ClientCategoryDto[]> {
        const clientCategorys = await this.service.findAll();
        return this.converter.toDtos(clientCategorys);
    }

    @ApiOperation({summary: 'Finds a client category by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ClientCategoryDto> {
        const clientCategory = await this.service.findById(id);
        return this.converter.toDto(clientCategory);
    }

    @ApiOperation({summary: 'Saves the specified client category'})
    @Post()
    async save(@Body() dto: ClientCategoryDto): Promise<ClientCategoryDto> {
        const clientCategory = this.converter.toItem(dto);
        const savedClientCategory = await this.service.save(clientCategory);
        return this.converter.toDto(savedClientCategory);
    }


    /*@ApiOperation({summary: 'Updates the specified client category'})
    @Put()
    async update(@Body() dto: ClientCategoryDto): Promise<ClientCategoryDto> {
        const clientCategory = this.converter.toItem(dto);
        const updatedClientCategory = await this.service.update(clientCategory);
        return this.converter.toDto(updatedClientCategory);
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Get('optimized')
    async findAllOptimized(): Promise<ClientCategoryDto[]> {
        const clientCategorys = await this.service.findAll();
        return this.converter.toDtos(clientCategorys);
    }

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ClientCategoryCriteria): Promise<ClientCategoryDto[]> {
        const clientCategorys = await this.service.findAll();
        return this.converter.toDtos(clientCategorys);
    }

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ClientCategoryCriteria): Promise<PaginatedList<ClientCategoryDto>> {
        const clientCategorys = await this.service.findAll();
        const clientCategoryDtos = this.converter.toDtos(clientCategorys);
        return new PaginatedList<ClientCategoryDto>(clientCategoryDtos, clientCategoryDtos.length);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ClientCategoryDto> {
        const clientCategory = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(clientCategory);
    }


    @Delete()
    async delete(@Body() dto: ClientCategoryDto): Promise<ClientCategoryDto> {
        const clientCategory = this.converter.toItem(dto);
        const deletedClientCategory = await this.service.delete(clientCategory);
        return this.converter.toDto(deletedClientCategory);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ClientCategoryDto[]): Promise<ClientCategoryDto[]> {
        const clientCategorys = dtos.map(dto => this.converter.toItem(dto));
        const deletedClientCategorys = await this.service.deleteMultiple(clientCategorys);
        return deletedClientCategorys.map(clientCategory => this.converter.toDto(clientCategory));
    }

}