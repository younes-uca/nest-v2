import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ProductConverter} from "src/app/controller/converter/ProductConverter";
import {ProductAdminServiceImpl} from "src/app/module/admin/service/ProductAdminServiceImpl";
import {ProductDto} from "src/app/controller/dto/ProductDto";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";


@ApiTags('Manages product services')
@Controller('api/admin/product')
export class ProductAdminRest {

    constructor(private readonly service: ProductAdminServiceImpl,
                private readonly converter: ProductConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all products'})
    @Get()
    async findAll(): Promise<ProductDto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a product by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ProductDto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a product by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified product'})
    @Post()
    async save(@Body() dto: ProductDto): Promise<ProductDto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified product'})
    @Put()
    async update(@Body() dto: ProductDto): Promise<ProductDto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Get('optimized')
    async findAllOptimized(): Promise<ProductDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ProductCriteria): Promise<ProductDto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ProductCriteria): Promise<PaginatedList<ProductDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ProductDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ProductDto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }


    @Post('multiple')
    async deleteMultiple(@Body() dtos: ProductDto[]): Promise<ProductDto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}