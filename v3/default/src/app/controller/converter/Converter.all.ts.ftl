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

@Injectable()
export class ${pojo.name}Converter extends AbstractConverter<${pojo.name}, ${pojo.name}Dto> {

    constructor(
<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name?? && dependency.msExterne == false>
        @Inject(forwardRef(() => ${dependency.name}Converter)) private readonly ${dependency.name?uncap_first}Converter: ${dependency.name}Converter,
        </#if>
    </#list>
</#if>
        ) { super();
    }

    toItem(dto: ${pojo.name}Dto): ${pojo.name} {
        if (!dto) {
            return null;
        }
        const item = new ${pojo.name}();
<#list pojo.fieldsSimple as fieldSimple>
        if (dto.${fieldSimple.name}) {
            item.${fieldSimple.name} = dto.${fieldSimple.name};
        }
</#list>
<#list pojo.fieldsGeneric as fieldGeneric>
    <#if (fieldGeneric.pojo.name)?? && pojo.name != fieldGeneric.pojo.name>
        if (dto.${fieldGeneric.name}?.id) {
            item.${fieldGeneric.name} = this.${fieldGeneric.typeAsPojo.name?uncap_first}Converter.toItem(dto.${fieldGeneric.name});
        }
    </#if>
</#list>
<#list pojo.fields as fieldList>
        <#if fieldList.list>
        if (dto.${fieldList.name}?.length > 0) {
            item.${fieldList.name} = this.${fieldList.typeAsPojo.name?uncap_first}Converter.toItems(dto.${fieldList.name});
        }
        </#if>
</#list>
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
    <#if (fieldGeneric.pojo.name)?? && pojo.name != fieldGeneric.pojo.name>
        if (item.${fieldGeneric.name}) {
            dto.${fieldGeneric.name} = this.${fieldGeneric.typeAsPojo.name?uncap_first}Converter.toDto(item.${fieldGeneric.name});
        }
    </#if>
</#list>
<#list pojo.fields as fieldList>
    <#if fieldList.list>
        if (item.${fieldList.name}?.length > 0) {
            dto.${fieldList.name} = this.${fieldList.typeAsPojo.name?uncap_first}Converter.toDtos(item.${fieldList.name});
        }
    </#if>
</#list>
        return dto;
    }

}