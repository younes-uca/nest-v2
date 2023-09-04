import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {ProductConverter} from "src/app/controller/converter/ProductConverter";
import {ProductAdminServiceImpl} from "src/app/module/admin/service/ProductAdminServiceImpl";
import {ProductDto} from "src/app/controller/dto/ProductDto";
import {ProductCriteria} from "src/app/controller/dao/criteria/core/ProductCriteria";
import {ClientDto} from "../../../controller/dto/ClientDto";
import {ClientCategoryDto} from "../../../controller/dto/ClientCategoryDto";


@ApiTags('Manages product services')
@Controller('api/admin/product')
export class ProductAdminRest {

    constructor(private readonly service: ProductAdminServiceImpl,
                private readonly converter: ProductConverter) {
    }

    @ApiOperation({summary: 'Finds a list of all products'})
    @Get()
    async findAll(): Promise<ProductDto[]> {
        const products = await this.service.findAll();
        return this.converter.toDtos(products);
    }

    @ApiOperation({summary: 'Finds a product by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<ProductDto> {
        const product = await this.service.findById(id);
        return this.converter.toDto(product);
    }

    @ApiOperation({summary: 'Saves the specified product'})
    @Post()
    async save(@Body() dto: ProductDto): Promise<ProductDto> {
        const product = this.converter.toItem(dto);
        const savedProduct = await this.service.save(product);
        return this.converter.toDto(savedProduct);
    }


    /*@ApiOperation({summary: 'Updates the specified product'})
    @Put()
    async update(@Body() dto: ProductDto): Promise<ProductDto> {
        const product = this.converter.toItem(dto);
        const updatedProduct = await this.service.update(product);
        return this.converter.toDto(updatedProduct);
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Get('optimized')
    async findAllOptimized(): Promise<ProductDto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ProductCriteria): Promise<ProductDto[]> {
        const products = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(products);
    }

    @ApiOperation({summary: 'Finds an optimized list of all products'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ProductCriteria): Promise<PaginatedList<ProductDto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<ClientCategoryDto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<ProductDto> {
        const product = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(product);
    }


    @Delete()
    async delete(@Body() dto: ProductDto): Promise<ProductDto> {
        const product = this.converter.toItem(dto);
        const deletedProduct = await this.service.delete(product);
        return this.converter.toDto(deletedProduct);
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ProductDto[]): Promise<ProductDto[]> {
        const products = dtos.map(dto => this.converter.toItem(dto));
        const deletedProducts = await this.service.deleteMultiple(products);
        return deletedProducts.map(product => this.converter.toDto(product));
    }

}