import {Injectable, NotFoundException} from "@nestjs/common";

import {AbstractServiceImpl} from "src/app/zynerator/service/AbstractServiceImpl";

import {${pojo.name}Dao} from "src/app/controller/dao/facade/core/${pojo.name}Dao";
import {${pojo.name}Criteria} from "src/app/controller/dao/criteria/core/${pojo.name}Criteria";
import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";
import {${pojo.name}Dto} from "src/app/controller/dto/${pojo.name}Dto";

<#list pojo.fields as field>
    <#if field.list>
import {${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl} from "src/app/module/${role.name?uncap_first}/service/${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl";
import {${field.typeAsPojo.name}} from "src/app/controller/bean/core/${field.typeAsPojo.name}";
    </#if>
</#list>

@Injectable()
export class ${pojo.name}${role.name?cap_first}ServiceImpl extends AbstractServiceImpl<${pojo.name}, ${pojo.name}Criteria, ${pojo.name}Dao>{

    constructor(private readonly dao: ${pojo.name}Dao ,
<#list pojo.fields as field>
    <#if field.list>
                 private readonly ${field.typeAsPojo.name?uncap_first}Service: ${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl ,
    </#if>
</#list>
    ) {
        super(dao);
    }

    async save(item: ${pojo.name}): Promise<${pojo.name}> {
        const saved = await this.dao.save(item);
    <#list pojo.fields as field>
        <#if field.list>
        if (item.${field.name}) {
            const saved${field.name?cap_first}: ${field.typeAsPojo.name}[] = [];
            for (const ${field.typeAsPojo.name?uncap_first} of item.${field.name}) {
                ${field.typeAsPojo.name?uncap_first}.${pojo.name?uncap_first} = saved;
                const saved${field.typeAsPojo.name} = await this.${field.typeAsPojo.name?uncap_first}Service.save(${field.typeAsPojo.name?uncap_first});
                saved${field.name?cap_first}.push(saved${field.typeAsPojo.name});
            }
            saved.${field.name} = saved${field.name?cap_first};
        }
        </#if>
    </#list>
        return saved;
    }


    async update(item: ${pojo.name}): Promise<${pojo.name}> {
        const saved = await this.dao.saveOrUpdate(item);
        return saved;
    }

    async updateMultiple(items: ${pojo.name}[]): Promise<void> {
        if (items) {
            items.forEach(e => this.update(e))
        }
    }

    async  findAllOptimized(): Promise<${pojo.name}Dto[]> {
        return this.dao.findAllOptimized();
    }

    async findAll(): Promise<${pojo.name}[]> {
        return this.dao.findAll();
    }

    async findById(id: number): Promise<${pojo.name}> {
        return this.dao.findById(id);
    }

    async deleteById(id: number): Promise<void> {
        return this.dao.deleteById(id);
    }

    async delete(${pojo.name?uncap_first}: ${pojo.name}): Promise<${pojo.name}> {
        const existing${pojo.name} = await this.findWithAssociatedLists(${pojo.name?uncap_first}.id);
        if (!existing${pojo.name}) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`${pojo.formatedName?cap_first} with ID <#noparse>${</#noparse>${pojo.name?uncap_first}.id<#noparse>}</#noparse> not found.`);
        }
<#list pojo.fields as field>
    <#if field.list==true >
       /* await Promise.all(
            existing${pojo.name}.${field.name}.map(async item => {
                await this.${field.typeAsPojo.name?uncap_first}Service.deleteById(item.id);
            })
        );*/
    </#if>
</#list>
        await this.dao.deleteById(existing${pojo.name}.id);
        return existing${pojo.name};
    }

    async deleteMultiple(${pojo.name?uncap_first}s: ${pojo.name}[]): Promise<${pojo.name}[]> {
        const deleted${pojo.name}s: ${pojo.name}[] = [];
        for (const ${pojo.name?uncap_first} of ${pojo.name?uncap_first}s) {
            const deleted${pojo.name} = await this.delete(${pojo.name?uncap_first});
            deleted${pojo.name}s.push(deleted${pojo.name});
        }
        return deleted${pojo.name}s;
    }

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if  (true || fieldGeneric.deleteByInclusion)  && fieldGeneric.pojo.msExterne ==false>
        <#if (fieldGeneric.typeAsPojo.state == false)>
    async findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.pojo.id.name}: number): Promise<${pojo.name}[]> {
        return this.dao.findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.pojo.id.name});
    }
        </#if>
    </#if>
</#list>

    async findWithAssociatedLists(id: number): Promise<${pojo.name}> {
        const result = await this.dao.findById(id);
    <#if pojo.hasList >
        if (result && result.id) {
<#list pojo.fields as field>
    <#if field.list==true >
          result.${field.name} = await this.${field.typeAsPojo.name?uncap_first}Service.findBy${pojo.name}Id(result.id);
    </#if>
</#list>
        }
    </#if>
    return result;
    }

    async updateWithAssociatedLists(item: ${pojo.name}): Promise<${pojo.name}> {
    <#if pojo.hasList >
            if (item && item.id) {
        <#list pojo.fields as field>
            <#if field.list==true >
                //update  ${field.name}
                const old${field.name?cap_first} = await this.${field.typeAsPojo.name?uncap_first}Service.findBy${pojo.name}Id(item.id);
                const result = this.${field.typeAsPojo.name?uncap_first}Service.getToBeSavedAndToBeDeleted(old${field.name?cap_first}, item.${field.name});
                await this.${field.typeAsPojo.name?uncap_first}Service.deleteMultiple(result[1]);
                (result[0] || []).forEach((e) => e.${pojo.name?uncap_first} = item);
                await this.${field.typeAsPojo.name?uncap_first}Service.updateMultiple(result[0]);

            </#if>
        </#list>
                return this.update(item);
        }
     <#else>
         return await this.dao.saveOrUpdate(item);
     </#if>
    }
}

