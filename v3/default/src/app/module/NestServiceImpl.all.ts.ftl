import {Injectable, NotFoundException} from "@nestjs/common";

import {${pojo.name}Dao} from "src/app/controller/dao/facade/core/${pojo.name}Dao";
import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";

<#list pojo.fields as field>
    <#if field.list>
import {${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl} from "src/app/module/${role.name?uncap_first}/service/impl/${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl";
import {${field.typeAsPojo.name}} from "src/app/controller/bean/core/${field.typeAsPojo.name}";
    </#if>
</#list>

@Injectable()
export class ${pojo.name}${role.name?cap_first}ServiceImpl  {

    constructor(private readonly ${pojo.name?uncap_first}Dao: ${pojo.name}Dao,
<#list pojo.fields as field>
    <#if field.list>
                 private readonly ${field.typeAsPojo.name?uncap_first}Service: ${field.typeAsPojo.name}${role.name?cap_first}ServiceImpl ,
    </#if>
</#list>
    ) {}

    async save(${pojo.name?uncap_first}: ${pojo.name}): Promise<${pojo.name}> {
        const saved${pojo.name} = await this.${pojo.name?uncap_first}Dao.save(${pojo.name?uncap_first});
    <#list pojo.fields as field>
        <#if field.list>
        if (${pojo.name?uncap_first}.${field.name}) {
            const saved${field.name?cap_first}: ${field.typeAsPojo.name}[] = [];
            for (const ${field.typeAsPojo.name?uncap_first} of ${pojo.name?uncap_first}.${field.name}) {
                ${field.typeAsPojo.name?uncap_first}.${pojo.name?uncap_first} = saved${pojo.name};
                const saved${field.typeAsPojo.name} = await this.${field.typeAsPojo.name?uncap_first}Service.save(${field.typeAsPojo.name?uncap_first});
                saved${field.name?cap_first}.push(saved${field.typeAsPojo.name});
            }
            saved${pojo.name}.${field.name} = saved${field.name?cap_first};
        }
        </#if>
    </#list>
        return saved${pojo.name};
    }

    async findAll(): Promise<${pojo.name}[]> {
        return this.${pojo.name?uncap_first}Dao.findAll();
    }

    async findById(id: number): Promise<${pojo.name}> {
        return this.${pojo.name?uncap_first}Dao.findById(id);
    }

    async delete(${pojo.name?uncap_first}: ${pojo.name}): Promise<${pojo.name}> {
        const existing${pojo.name} = await this.findWithAssociatedLists(${pojo.name?uncap_first}.id);
        if (!existing${pojo.name}) {
            // TODO : by Monsieur Zouani
            throw new NotFoundException(`${pojo.formatedName?cap_first} with ID <#noparse>${</#noparse>${pojo.name?uncap_first}.id<#noparse>}</#noparse> not found.`);
        }
<#list pojo.fields as field>
    <#if field.list==true >
        await Promise.all(
            existing${pojo.name}.${field.name}.map(async item => {
                await this.${field.typeAsPojo.name?uncap_first}Service.deleteById(item.id);
            })
        );
    </#if>
</#list>
        await this.${pojo.name?uncap_first}Dao.deleteById(existing${pojo.name}.id);
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
        return this.${pojo.name?uncap_first}Dao.findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.pojo.id.name});
    }
        </#if>
    </#if>
</#list>

    async findWithAssociatedLists(id: number): Promise<${pojo.name}> {
        const result = await this.${pojo.name?uncap_first}Dao.findById(id);
        if (result && result.id) {
<#list pojo.fields as field>
    <#if field.list==true >
          result.${field.name} = await this.${field.typeAsPojo.name?uncap_first}Service.findBy${pojo.name}Id(result.id);
    </#if>
</#list>
        }
        return result;
    }

}

