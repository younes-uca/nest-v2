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
        const ${pojo.name?uncap_first}s = await this.service.findAll();
        return this.converter.toDtos(${pojo.name?uncap_first}s);
    }

    @ApiOperation({summary: 'Finds a ${pojo.formatedName?uncap_first} by id'})
    @Get('id/:id')
    async findById(@Param('id') id: number): Promise<${pojo.name}Dto> {
        const ${pojo.name?uncap_first} = await this.service.findById(id);
        return this.converter.toDto(${pojo.name?uncap_first});
    }

    @ApiOperation({summary: 'Saves the specified ${pojo.formatedName?uncap_first}'})
    @Post()
    async save(@Body() dto: ${pojo.name}Dto): Promise<${pojo.name}Dto> {
        const ${pojo.name?uncap_first} = this.converter.toItem(dto);
        const saved${pojo.name} = await this.service.save(${pojo.name?uncap_first});
        return this.converter.toDto(saved${pojo.name});
    }


    /*@ApiOperation({summary: 'Updates the specified ${pojo.formatedName?uncap_first}'})
    @Put()
    async update(@Body() dto: ${pojo.name}Dto): Promise<${pojo.name}Dto> {
        const ${pojo.name?uncap_first} = this.converter.toItem(dto);
        const updated${pojo.name} = await this.service.update(${pojo.name?uncap_first});
        return this.converter.toDto(updated${pojo.name});
    }
    */

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Get('optimized')
    async findAllOptimized(): Promise<${pojo.name}Dto[]> {
        const result = await this.service.findAllOptimized();
        return result;
    }

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Post('find-by-criteria')
    async findByCriteria(@Body() criteria: ${pojo.name}Criteria): Promise<${pojo.name}Dto[]> {
        const ${pojo.name?uncap_first}s = await this.service.findByCriteria(criteria);
        return this.converter.toDtos(${pojo.name?uncap_first}s);
    }

    @ApiOperation({summary: 'Finds an optimized list of all ${pojo.name?uncap_first}s'})
    @Post('find-paginated-by-criteria')
    async findPaginatedByCriteria(@Body() criteria: ${pojo.name}Criteria): Promise<PaginatedList<${pojo.name}Dto>> {
        const ${pojo.name?uncap_first}s = await this.service.findPaginatedByCriteria(criteria);
        const ${pojo.name?uncap_first}Dtos = this.converter.toDtos(${pojo.name?uncap_first}s);
        return new PaginatedList<${pojo.name}Dto>(${pojo.name?uncap_first}Dtos, ${pojo.name?uncap_first}Dtos.length);
    }

    @Get('detail/id/:id')
    async findWithAssociatedLists(@Param('id') id: number): Promise<${pojo.name}Dto> {
        const ${pojo.name?uncap_first} = await this.service.findWithAssociatedLists(id);
        return this.converter.toDto(${pojo.name?uncap_first});
    }

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if  (true || fieldGeneric.deleteByInclusion)  && fieldGeneric.typeAsPojo.msExterne ==false>
        <#if (fieldGeneric.typeAsPojo.state == false)>
    @Get('${fieldGeneric.name?uncap_first}/${fieldGeneric.typeAsPojo.id.name}/:${fieldGeneric.typeAsPojo.id.name}')
    async findBy${fieldGeneric.name?cap_first}Id(@Param('${fieldGeneric.typeAsPojo.id.name}') ${fieldGeneric.typeAsPojo.id.name}: number): Promise<${pojo.name}Dto[]> {
        const ${pojo.name?uncap_first}s = await this.service.findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.typeAsPojo.id.name});
        return this.converter.toDtos(${pojo.name?uncap_first}s);
    }
        </#if>
    </#if>
</#list>

    @Delete()
    async delete(@Body() dto: ${pojo.name}Dto): Promise<${pojo.name}Dto> {
        const ${pojo.name?uncap_first} = this.converter.toItem(dto);
        const deleted${pojo.name} = await this.service.delete(${pojo.name?uncap_first});
        return this.converter.toDto(deleted${pojo.name});
    }

    @Post('multiple')
    async deleteMultiple(@Body() dtos: ${pojo.name}Dto[]): Promise<${pojo.name}Dto[]> {
        const ${pojo.name?uncap_first}s = dtos.map(dto => this.converter.toItem(dto));
        const deleted${pojo.name}s = await this.service.deleteMultiple(${pojo.name?uncap_first}s);
        return deleted${pojo.name}s.map(${pojo.name?uncap_first} => this.converter.toDto(${pojo.name?uncap_first}));
    }

}