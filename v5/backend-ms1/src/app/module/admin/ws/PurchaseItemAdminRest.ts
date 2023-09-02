import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {PurchaseItemConverter} from "src/app/controller/converter/PurchaseItemConverter";
import {PurchaseItemAdminServiceImpl} from "src/app/module/admin/service/PurchaseItemAdminServiceImpl";
import {PurchaseItemDto} from "src/app/controller/dto/PurchaseItemDto";
import {PurchaseItemCriteria} from "../../../controller/dao/criteria/core/PurchaseItemCriteria";


@ApiTags('Manages purchase item services')
@Controller('api/admin/purchaseItem')
export class PurchaseItemAdminRest {

    constructor(private readonly service: PurchaseItemAdminServiceImpl,
                private readonly converter: PurchaseItemConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all purchaseItems'})
    @Get()
    async findAll(): Promise<PurchaseItemDto[]> {
        const purchaseItems = await this.service.findAll();
        return this.converter.toDtos(purchaseItems);
    }

    @ApiOperation({summary: 'Finds a purchase item by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<PurchaseItemDto> {
        const purchaseItem = await this.service.findById(id);
        return this.converter.toDto(purchaseItem);
    }

    @ApiOperation({summary: 'Saves the specified purchase item'})
    @Post()
    async save(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const purchaseItem = this.converter.toItem(dto);
        const savedPurchaseItem = await this.service.save(purchaseItem);
        return this.converter.toDto(savedPurchaseItem);
    }


    /*@ApiOperation({summary: 'Updates the specified purchase item'})
    @Put()
    async update(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const purchaseItem = this.converter.toItem(dto);
        const updatedPurchaseItem = await this.service.update(purchaseItem);
        return this.converter.toDto(updatedPurchaseItem);
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Get('optimized')
    async findAllOptimized(): Promise<PurchaseItemDto[]> {
        const purchaseItems = await this.service.findAll();
        return this.converter.toDtos(purchaseItems);
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: PurchaseItemCriteria): Promise<PurchaseItemDto[]> {
        const purchaseItems = await this.service.findAll();
        return this.converter.toDtos(purchaseItems);
    }

    @ApiOperation({summary: 'Finds an optimized list of all purchaseItems'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: PurchaseItemCriteria): Promise<PaginatedList<PurchaseItemDto>> {
        const purchaseItems = await this.service.findAll();
        const purchaseItemDtos = this.converter.toDtos(purchaseItems);
        return new PaginatedList<PurchaseItemDto>(purchaseItemDtos, purchaseItemDtos.length);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<PurchaseItemDto> {
        const purchaseItem = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(purchaseItem);
    }

    @Get('product/id/:id')
    async findByProductId(@Param('id') id: number): Promise<PurchaseItemDto[]> {
        const purchaseItems = await this.service.findByProductId(id);
        return this.converter.toDtos(purchaseItems);
    }
    @Get('purchase/id/:id')
    async findByPurchaseId(@Param('id') id: number): Promise<PurchaseItemDto[]> {
        const purchaseItems = await this.service.findByPurchaseId(id);
        return this.converter.toDtos(purchaseItems);
    }

    @Delete()
    async delete(@Body() dto: PurchaseItemDto): Promise<PurchaseItemDto> {
        const purchaseItem = this.converter.toItem(dto);
        const deletedPurchaseItem = await this.service.delete(purchaseItem);
        return this.converter.toDto(deletedPurchaseItem);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: PurchaseItemDto[]): Promise<PurchaseItemDto[]> {
        const purchaseItems = dtos.map(dto => this.converter.toItem(dto));
        const deletedPurchaseItems = await this.service.deleteMultiple(purchaseItems);
        return deletedPurchaseItems.map(purchaseItem => this.converter.toDto(purchaseItem));
    }

}