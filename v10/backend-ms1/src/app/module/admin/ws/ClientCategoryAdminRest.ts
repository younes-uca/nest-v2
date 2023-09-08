import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ClientCategoryConverter} from "src/app/controller/converter/ClientCategoryConverter";
import {ClientCategoryAdminServiceImpl} from "src/app/module/admin/service/ClientCategoryAdminServiceImpl";
import {ClientCategoryDto} from "src/app/controller/dto/ClientCategoryDto";
import {ClientCategoryCriteria} from "src/app/controller/dao/criteria/core/ClientCategoryCriteria";


@ApiTags('Manages client category services')
@Controller('api/admin/clientCategory')
export class ClientCategoryAdminRest {

    constructor(private readonly service: ClientCategoryAdminServiceImpl,
                private readonly converter: ClientCategoryConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all clientCategorys'})
    @Get()
    async findAll(): Promise<ClientCategoryDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a client category by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ClientCategoryDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a client category by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified client category'})
    @Post()
    async save(@Body() dto: ClientCategoryDto): Promise<ClientCategoryDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified client category'})
    @Put()
    async update(@Body() dto: ClientCategoryDto): Promise<ClientCategoryDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Get('optimized')
    async findAllOptimized(): Promise<ClientCategoryDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ClientCategoryCriteria): Promise<ClientCategoryDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all clientCategorys'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ClientCategoryCriteria): Promise<PaginatedList<ClientCategoryDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ClientCategoryDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ClientCategoryDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }


    @Post('multiple')
    async deleteMultiple(@Body() dtos: ClientCategoryDto[]): Promise<ClientCategoryDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}