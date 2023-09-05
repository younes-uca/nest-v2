import {Body, Controller,Delete , Get, Param, Post, Put} from '@nestjs/common';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import {PaginatedList} from "src/app/zynerator/util/PaginatedList";

import {${pojo.name}Converter} from "src/app/controller/converter/${pojo.name}Converter";
import {${pojo.name}${role.name?cap_first}ServiceImpl} from "src/app/module/${role.name?uncap_first}/service/${pojo.name}AdminServiceImpl";
import {${pojo.name}Dto} from "src/app/controller/dto/${pojo.name}Dto";
import {${pojo.name}Criteria} from "src/app/controller/dao/criteria/core/${pojo.name}Criteria";


@ApiTags('Manages ${pojo.formatedName?uncap_first} services')
@Controller('api/${role.name?uncap_first}/${pojo.name?uncap_first}')
export class ${pojo.name}${role.name?cap_first}Rest {

    constructor(private readonly service: ${pojo.name}${role.name?cap_first}ServiceImpl,
                private readonly converter: ${pojo.name}Converter) {
    }

    @ApiOperation({summary: 'Finds a list of all ${pojo.name?uncap_first}s'})
    @Get()
    async findAll(): Promise<${pojo.name}Dto[]> {
        const items = await this.service.findAll();
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds a ${pojo.formatedName?uncap_first} by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<${pojo.name}Dto> {
        const item = await this.service.findById(id);
        return this.converter.toDto(item);
    }

    @ApiOperation({summary: 'Deletes a ${pojo.formatedName?uncap_first} by id'})
    @Delete('id/:id')
    async deleteById(@Param('id') id: number): Promise<number> {
        return this.service.deleteById(id);
    }

    @ApiOperation({summary: 'Saves the specified ${pojo.formatedName?uncap_first}'})
    @Post()
    async save(@Body() dto: ${pojo.name}Dto): Promise<${pojo.name}Dto> {
        const item = this.converter.toItem(dto);
        const savedItem = await this.service.save(item);
        return this.converter.toDto(savedItem);
    }


    @ApiOperation({summary: 'Updates the specified ${pojo.formatedName?uncap_first}'})
    @Put()
    async update(@Body() dto: ${pojo.name}Dto): Promise<${pojo.name}Dto> {
        const item = this.converter.toItem(dto);
        const result = await this.service.updateWithAssociatedLists(item);
        return this.converter.toDto(result);
   }

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Get('optimized')
    async findAllOptimized(): Promise<${pojo.name}Dto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ${pojo.name}Criteria): Promise<${pojo.name}Dto[]> {
        const items = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(items);
    }

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ${pojo.name}Criteria): Promise<PaginatedList<${pojo.name}Dto>> {
        const paginated = await this.service.findPaginatedByCriteria(criteria);
        const dtos = this.converter.toDtos(paginated.list);
        return new PaginatedList<${pojo.name}Dto>(dtos, paginated.dataSize);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<${pojo.name}Dto> {
        const item = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(item);
    }

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if  (true || fieldGeneric.deleteByInclusion)  && fieldGeneric.typeAsPojo.msExterne ==false>
        <#if (fieldGeneric.typeAsPojo.state == false)>
    @Get('${fieldGeneric.name?uncap_first}/${fieldGeneric.typeAsPojo.id.name}/:${fieldGeneric.typeAsPojo.id.name}')
    async findBy${fieldGeneric.name?cap_first}Id(@Param('${fieldGeneric.typeAsPojo.id.name}') ${fieldGeneric.typeAsPojo.id.name}: number): Promise<${pojo.name}Dto[]> {
        const items = await this.service.findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.typeAsPojo.id.name});
        return this.converter.toDtos(items);
    }
        </#if>
    </#if>
</#list>

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ${pojo.name}Dto[]): Promise<${pojo.name}Dto[]> {
        const items = dtos.map(dto => this.converter.toItem(dto));
        const deletedItems = await this.service.deleteMultiple(items);
        return deletedItems.map(element => this.converter.toDto(element));
    }

}