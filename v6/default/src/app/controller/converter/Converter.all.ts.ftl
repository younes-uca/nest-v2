import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {AbstractConverter} from "src/app/zynerator/converter/AbstractConverter";

import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";
import {${pojo.name}Dto} from "src/app/controller/dto/${pojo.name}Dto";

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name}Converter} from "src/app/controller/converter/${dependency.name}Converter";
        </#if>
    </#list>
</#if>
<#if pojo.fieldsGeneric??>
    <#list pojo.fieldsGeneric as fieldGeneric>
        <#if fieldGeneric.pojo.msExterne == false && fieldGeneric.eligibleForStackOverFlow == true>
import {${fieldGeneric.typeAsPojo.name}} from "src/app/controller/bean/core/${fieldGeneric.typeAsPojo.name}";
        </#if>
    </#list>
</#if>

@Injectable()
export class ${pojo.name}Converter extends AbstractConverter<${pojo.name}, ${pojo.name}Dto> {

<#list pojo.fieldsGeneric as fieldGeneric>
    ${fieldGeneric.name}: boolean;
</#list>
<#list pojo.fields as fieldList>
    <#if fieldList.list == true>
    ${fieldList.name}: boolean;
    </#if>
</#list>

    constructor(
<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name?? && dependency.msExterne == false>
        @Inject(forwardRef(() => ${dependency.name}Converter)) readonly ${dependency.name?uncap_first}Converter: ${dependency.name}Converter,
        </#if>
    </#list>
</#if>
        ) {
            super();
        <#if pojo.hasList || pojo.hasGeneric>
            this.init(true);
        </#if>
    }

    toItem(dto: ${pojo.name}Dto): ${pojo.name} {
        if (!dto) {
            return null;
        }
        const item =<#if pojo.subEntity>super.toItem(dto);<#else>new ${pojo.name}();</#if>
<#list pojo.fieldsSimple as fieldSimple>
        if (dto.${fieldSimple.name}) {
            item.${fieldSimple.name} = dto.${fieldSimple.name};
        }
</#list>
<#list pojo.fieldsGeneric as fieldGeneric>
    <#if (fieldGeneric.pojo.name)?? && pojo.name != fieldGeneric.pojo.name>
        if (this.${fieldGeneric.name} && dto.${fieldGeneric.name}?.id) {
            item.${fieldGeneric.name} = this.${fieldGeneric.typeAsPojo.name?uncap_first}Converter.toItem(dto.${fieldGeneric.name});
        }
    </#if>
</#list>


<#list pojo.fieldsGeneric as fieldGeneric>
    <#if (fieldGeneric.pojo.name)?? && pojo.name != fieldGeneric.pojo.name>
        <#if fieldGeneric.pojo.msExterne == false && fieldGeneric.eligibleForStackOverFlow == true>
        if(dto.${fieldGeneric.name} && dto.${fieldGeneric.name}.${fieldGeneric.pojo.id.name}){
            item.${fieldGeneric.name} = new ${fieldGeneric.typeAsPojo.name}();
            item.${fieldGeneric.name}.${fieldGeneric.pojo.id.name} = dto.${fieldGeneric.name}.${fieldGeneric.pojo.id.name};
            <#if fieldGeneric.typeAsPojo.labelOrReferenceOrId.name != pojo.name>
            item.${fieldGeneric.name}.${fieldGeneric.typeAsPojo.labelOrReferenceOrId.name} = dto.${fieldGeneric.name}.${fieldGeneric.typeAsPojo.labelOrReferenceOrId.name};
            </#if>
        }
        <#elseif fieldGeneric.pojo.msExterne == false && fieldGeneric.eligibleForStackOverFlow == false>
        if(this.${fieldGeneric.name} && dto.${fieldGeneric.name} &&  dto.${fieldGeneric.name}.id)
            item.${fieldGeneric.name} = this.${fieldGeneric.type.simpleName?uncap_first}Converter.toItem(dto.${fieldGeneric.name}) ;
        <#else>
        if(this.${fieldGeneric.name} && dto.${fieldGeneric.name}() &&  dto.${fieldGeneric.name}.id)
            item.${fieldGeneric.name} = dto.${fieldGeneric.name} ;
        </#if>
    <#else>
        if(this.${fieldGeneric.name} && dto.${fieldGeneric.name})
            item.${fieldGeneric.name} = toItem(dto.${fieldGeneric.name}) ;
    </#if>

</#list>

<#list pojo.fields as fieldList>
    <#if fieldList.list>
        if (this.${fieldList.name} && dto.${fieldList.name}?.length > 0) {
        <#if pojo.name != fieldList.pojo.name>
            item.${fieldList.name} = this.${fieldList.type.simpleName?uncap_first}Converter.toItems(dto.${fieldList.name});
        <#else>
            item.${fieldList.name} = toItem(dto.${fieldList.name});
        </#if>
        }
    </#if>
</#list>

<#if pojo.actor>
        item.roles = dto.roles;
</#if>
<#if pojo.enhanced>
        convertRefentielAttribute(dto, item);
</#if>
        return item;
    }

    toDto(item: ${pojo.name}): ${pojo.name}Dto {
        if (!item) {
            return null;
        }
        const dto = new ${pojo.name}Dto();

<#list pojo.fieldsSimple as fieldSimple>
        if (item.${fieldSimple.name}) {
            dto.${fieldSimple.name} = item.${fieldSimple.name};
        }
</#list>
<#list pojo.fieldsGeneric as fieldGeneric>
        if(this.${fieldGeneric.name} && item.${fieldGeneric.name}) {
    <#if (fieldGeneric.pojo.name)?? && pojo.name != fieldGeneric.pojo.name>
        <#list fieldGeneric.typeAsPojo.fields as fieldsGenericOfThisField>
        <#if fieldsGenericOfThisField.generic && fieldsGenericOfThisField.typeAsPojo.name == pojo.name && fieldGeneric.pojo.msExterne == false>
            this.${fieldGeneric.type.simpleName?uncap_first}Converter.${fieldsGenericOfThisField.name} = false;
            </#if>
        </#list>
        <#if fieldGeneric.pojo.msExterne == false>
            dto.${fieldGeneric.name} = this.${fieldGeneric.type.simpleName?uncap_first}Converter.toDto(item.${fieldGeneric.name}) ;
        <#else>
            dto.${fieldGeneric.name} = item.${fieldGeneric.name} ;
        </#if>
        <#list fieldGeneric.typeAsPojo.fields as fieldsGenericOfThisField>
            <#if fieldsGenericOfThisField.generic && fieldsGenericOfThisField.typeAsPojo.name == pojo.name  && fieldGeneric.pojo.msExterne == false>
            this.${fieldGeneric.type.simpleName?uncap_first}Converter.${fieldsGenericOfThisField.name} = true;
            </#if>
        </#list>
    <#elseif (fieldGeneric.pojo.fields)??>
        <#list fieldGeneric.typeAsPojo.fields as fieldsGenericOfThisField>
            <#if fieldsGenericOfThisField.generic && fieldsGenericOfThisField.typeAsPojo.name == pojo.name>
            this.${fieldsGenericOfThisField.name} = false;
            </#if>
        </#list>
            dto.${fieldGeneric.name} = toDto(item.${fieldGeneric.name}) ;
        <#list fieldGeneric.typeAsPojo.fields as fieldsGenericOfThisField>
            <#if fieldsGenericOfThisField.generic && fieldsGenericOfThisField.typeAsPojo.name == pojo.name>
            this.${fieldsGenericOfThisField.name} = true;
            </#if>
        </#list>
    </#if>
    <#if pojo.actor>
        dto.roles = item.roles;
    </#if>
    }
</#list>

<#list pojo.fields as fieldList>
    <#if fieldList.list == true>
        if(this.${fieldList.name} && item.${fieldList.name}?.length > 0){
        <#if (pojo.hasList || pojo.hasGeneric)  && pojo.msExterne == false>
            this.${fieldList.type.simpleName?uncap_first}Converter.init(true);
        </#if>
        <#if  pojo.msExterne == false>
            this.${fieldList.type.simpleName?uncap_first}Converter.${pojo.name?uncap_first} = false;
            dto.${fieldList.name} = this.${fieldList.type.simpleName?uncap_first}Converter.toDtos(item.${fieldList.name});
            this.${fieldList.type.simpleName?uncap_first}Converter.${pojo.name?uncap_first} = true;
        <#else>
            dto.${fieldList.name} = item.${fieldList.name};
        </#if>
        }
    </#if>
</#list>

<#if pojo.enhanced>
    convertRefentielAttribute(item, dto);
</#if>
        return dto;
    }


<#if pojo.hasList>
    public initList(value: boolean): void {
    <#if pojo.subEntity>
        super.initList(value);
    </#if>
    <#list pojo.fields as fieldList>
        <#if fieldList.list == true>
            this.${fieldList.name} = value;
        </#if>
    </#list>
    }
</#if>

    public initObject(value: boolean): void {
    <#if pojo.subEntity>
        super.initObject(value);
    </#if>
    <#list pojo.fieldsGeneric as fieldGeneric>
        this.${fieldGeneric.name} = value;
    </#list>
    }
}