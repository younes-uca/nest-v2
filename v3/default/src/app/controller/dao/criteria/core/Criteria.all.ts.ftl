<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name?? && dependency.msExterne && dependency.msPackaging != pojo.msPackaging>
import {${dependency.name}Criteria} from "src/app/controller/dao/criteria/core/${dependency.name}Criteria";
        </#if>
    </#list>
</#if>


public class ${pojo.name}Criteria extends <#if !pojo.subEntity> BaseCriteria<#if pojo.enhanced>Enhanced</#if> <#else> ${pojo.superEntity.name}Criteria</#if> {

<#list pojo.fieldsSimple as fieldSimple>
     <#if  !fieldSimple.id>
        <#if  fieldSimple.dateTime || fieldSimple.localDate>
    public ${fieldSimple.name}: Date;
    public ${fieldSimple.name}From: Date;
    public ${fieldSimple.name}To: Date;
         <#elseif fieldSimple.nombre>
    public ${fieldSimple.name}: string;
    public ${fieldSimple.name}Min: string;
    public ${fieldSimple.name}Max: string;
        <#elseif fieldSimple.bool>
    public ${fieldSimple.type.name} ${fieldSimple.name};
        <#elseif true || !fieldSimple.large>
    public ${fieldSimple.name}: string;
    public ${fieldSimple.name}Like: string;
        </#if>
    </#if>
</#list>

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if fieldGeneric.typeAsPojo?? && (true || (fieldGeneric.typeAsPojo.msExterne && fieldGeneric.typeAsPojo.msPackaging != pojo.msPackaging))>
    public ${fieldGeneric.name} ${fieldGeneric.typeAsPojo.name}Criteria;
    public ${fieldGeneric.name}s Array<${fieldGeneric.typeAsPojo.name}Criteria>;
    </#if>
</#list>

    public constructor(){}
}
