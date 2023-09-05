<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name}Dto} from "src/app/controller/dto/${dependency.name}Dto";
        </#if>
    </#list>
</#if>

<#if pojo.actor>
import {Role} from "src/app/module/auth/bean/Role";
</#if>
export class ${pojo.name}Dto {
    public id: number;
<#list pojo.fieldsSimple as fieldSimple>
    <#if fieldSimple.id == false>
    <#if fieldSimple.pureString>
    public ${fieldSimple.name?uncap_first}: string;
    </#if>
    <#if fieldSimple.nombre>
    public ${fieldSimple.name?uncap_first}: number;
    </#if>
    <#if fieldSimple.bool>
    public ${fieldSimple.name?uncap_first}: boolean;
    </#if>
    <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
    public ${fieldSimple.name?uncap_first}: Date;
    </#if>
    </#if>
</#list>

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if fieldGeneric.pojo??>
    public ${fieldGeneric.name?uncap_first}: ${fieldGeneric.pojo.name}Dto;
    </#if>
</#list>
<#list pojo.fields as field>
    <#if field.list>
    public ${field.name?uncap_first}: ${field.typeAsPojo.name}Dto[];
    </#if>
</#list>

    constructor(id?: number<#if  pojo.labelOrReference??>, ${pojo.labelOrReference.name}?: ${pojo.labelOrReference.type.name?uncap_first}</#if>) {
        this.id = id;
<#if  pojo.labelOrReference??>
        this.${pojo.labelOrReference.name} = ${pojo.labelOrReference.name};
</#if>
    }

<#if pojo.actor>
    role: Role;
</#if>


}