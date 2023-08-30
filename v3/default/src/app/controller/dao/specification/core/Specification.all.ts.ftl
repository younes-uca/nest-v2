package  ${config.domain}.${config.groupId}.${config.projectName}.${config.dao}.specification.core;

<#if !pojo.subEntity>
import ${config.domain}.${config.groupId}.${config.projectName}.zynerator.specification.AbstractSpecification<#if pojo.enhanced>Enhanced</#if>;
</#if>
import ${config.domain}.${config.groupId}.${config.projectName}.${config.dao}.criteria.core.${pojo.name}Criteria;
import ${config.domain}.${config.groupId}.${config.projectName}.${config.bean}.core.${pojo.name};

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class ${pojo.name}Specification extends <#if !pojo.subEntity> AbstractSpecification<#if pojo.enhanced>Enhanced</#if><${pojo.name}Criteria, ${pojo.name}> <#else> ${pojo.superEntity.name}Specification</#if> {

    @Override
    public void constructPredicates() {
    <#if pojo.subEntity>
        super.constructPredicates();
    </#if>
    <#list pojo.fieldsSimple as fieldSimple>
         <#if  fieldSimple.id>
        addPredicateId("id", criteria);
         <#elseif  fieldSimple.dateTime || fieldSimple.localDate>
        addPredicate("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(), criteria.get${fieldSimple.name?cap_first}From(), criteria.get${fieldSimple.name?cap_first}To());
        <#elseif fieldSimple.integerNumber>
        addPredicateInt("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(), criteria.get${fieldSimple.name?cap_first}Min(), criteria.get${fieldSimple.name?cap_first}Max());
        <#elseif fieldSimple.longNumber>
        addPredicateLong("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(), criteria.get${fieldSimple.name?cap_first}Min(), criteria.get${fieldSimple.name?cap_first}Max());
         <#elseif fieldSimple.doubleNumber>
        addPredicateDouble("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(), criteria.get${fieldSimple.name?cap_first}Min(), criteria.get${fieldSimple.name?cap_first}Max());
         <#elseif fieldSimple.bigDecimalNumber>
        addPredicateBigDecimal("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(), criteria.get${fieldSimple.name?cap_first}Min(), criteria.get${fieldSimple.name?cap_first}Max());
         <#elseif fieldSimple.bool>
        addPredicateBool("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}());
         <#elseif !fieldSimple.large>
        addPredicate("${fieldSimple.name}", criteria.get${fieldSimple.name?cap_first}(),criteria.get${fieldSimple.name?cap_first}Like());
        </#if>
    </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
        <#if fieldGeneric.typeAsPojo?? && (true || (fieldGeneric.typeAsPojo.msExterne && fieldGeneric.typeAsPojo.msPackaging != pojo.msPackaging))>
        addPredicateFk("${fieldGeneric.name}","id", criteria.get${fieldGeneric.name?cap_first}()==null?null:criteria.get${fieldGeneric.name?cap_first}().get${fieldGeneric.typeAsPojo.id.name?cap_first}());
        addPredicateFk("${fieldGeneric.name}","id", criteria.get${fieldGeneric.name?cap_first}s());
        </#if>
        <#if fieldGeneric.typeAsPojo?? && fieldGeneric.typeAsPojo.reference??>
        addPredicateFk("${fieldGeneric.name}","${fieldGeneric.typeAsPojo.reference.name}", criteria.get${fieldGeneric.name?cap_first}()==null?null:criteria.get${fieldGeneric.name?cap_first}().get${fieldGeneric.typeAsPojo.reference.name?cap_first}());
        </#if>
    </#list>
    }

    public ${pojo.name}Specification(${pojo.name}Criteria criteria) {
        super(criteria);
    }

    public ${pojo.name}Specification(${pojo.name}Criteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
