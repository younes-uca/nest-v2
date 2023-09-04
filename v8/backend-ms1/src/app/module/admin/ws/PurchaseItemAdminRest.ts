import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {PurchaseItemConverter} from "src/app/controller/converter/PurchaseItemConverter";
import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/PurchaseItemAdminServiceImpl";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {PurchaseItemCriteria} from "src/app/controller/dao/criteria/core/PurchaseItemCriteria";


@ApiTags('Manages purchase item services')
@Controller('api/admin/purchaseItem')
export class PurchaseItemAdminRest {

    constructor(private readonly service: PurchaseItemAdminServiceImpl,
                private readonly converter: PurchaseItemConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all purchaseItems'})
    @Get()
    async findAll(): Promise<PurchaseItemDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a purchase item by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<PurchaseItemDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Saves the specified purchase item'})
    @Post()
    async save(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    /*@ApiOperation({summary: 'Updates the specified purchase item'})
    @Put()
    async update(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.update(item);
        return this.converter.toDto(result);
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Get('optimized')
    async findAllOptimized(): Promise<PurchaseItemDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: PurchaseItemCriteria): Promise<PurchaseItemDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: PurchaseItemCriteria): Promise<PaginatedList<PurchaseItemDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<PurchaseItemDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<PurchaseItemDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

    @Get('product/id/:id')
    async findByProductId(@Param('id') id: number): Promise<PurchaseItemDto[]> {
        const items = await this.service.findByProductId(id);
        return this.converter.toDtos(items);
    }
    @Get('purchase/id/:id')
    async findByPurchaseId(@Param('id') id: number): Promise<PurchaseItemDto[]> {
        const items = await this.service.findByPurchaseId(id);
        return this.converter.toDtos(items);
    }

    @Delete()
    async delete(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const item = this.converter.toItem(dto);
        const deletedItem = await this.service.delete(item);
        return this.converter.toDto(deletedItem);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: PurchaseItemDto[]): Promise<PurchaseItemDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}