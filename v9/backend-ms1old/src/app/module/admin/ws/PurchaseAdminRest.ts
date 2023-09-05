import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {PurchaseConverter} from "src/app/controller/converter/PurchaseConverter";
import {PurchaseAdminServiceImpl} from "src/app/module/admin/service/PurchaseAdminServiceImpl";
import {PurchaseDto} from "src/app/controller/dto/PurchaseDto";
import {PurchaseCriteria} from "src/app/controller/dao/criteria/core/PurchaseCriteria";


@ApiTags('Manages purchase services')
@Controller('api/admin/purchase')
export class PurchaseAdminRest {

    constructor(private readonly service: PurchaseAdminServiceImpl,
                private readonly converter: PurchaseConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all purchases'})
    @Get()
    async findAll(): Promise<PurchaseDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a purchase by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<PurchaseDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a purchase by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<void> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified purchase'})
    @Post()
    async save(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified purchase'})
    @Put()
    async update(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchases'})
    @Get('optimized')
    async findAllOptimized(): Promise<PurchaseDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchases'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: PurchaseCriteria): Promise<PurchaseDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchases'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: PurchaseCriteria): Promise<PaginatedList<PurchaseDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<PurchaseDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<PurchaseDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

    @Get('client/id/:id')
    async findByClientId(@Param('id') id: number): Promise<PurchaseDto[]> {
        const items = await this.service.findByClientId(id);
        return this.converter.toDtos(items);
    }

    @Delete()
    async delete(@Body() dto: PurchaseDto): Promise<PurchaseDto> {
        const item = this.converter.toItem(dto);
        const deletedItem = await this.service.delete(item);
        return this.converter.toDto(deletedItem);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: PurchaseDto[]): Promise<PurchaseDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}