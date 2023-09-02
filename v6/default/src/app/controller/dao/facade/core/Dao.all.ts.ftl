import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {AbstractRepository} from "src/app/zynerator/repository/AbstractRepository";

import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";
import {${pojo.name}Criteria} from "src/app/controller/dao/criteria/core/${pojo.name}Criteria";

@Injectable()
export class ${pojo.name}Dao extends AbstractRepository<${pojo.name}, ${pojo.name}Criteria> {

    constructor(@InjectRepository(${pojo.name}) private readonly repository: Repository<${pojo.name}>,) {
        super();
    }

    async save(item: ${pojo.name}): Promise<${pojo.name}> {
        const savedItem = await this.repository.save(item);
        return savedItem;
    }

    async  findAll(): Promise<${pojo.name}[]> {
        return this.repository.find();
    }

    async findById(id: number): Promise<${pojo.name}> {
        return this.repository.findOne({where: {id}});
    }


    deleteById(id: number): Promise<void> {
        return this.repository.delete({id}).then(() => undefined);
    }

<#list pojo.fieldsGeneric as fieldGeneric>
    <#if  (true || fieldGeneric.deleteByInclusion)  && fieldGeneric.pojo.msExterne ==false>
        <#if (fieldGeneric.typeAsPojo.state == false)>
    findBy${fieldGeneric.name?cap_first}Id(${fieldGeneric.pojo.id.name}: number): Promise<${pojo.name}[]> {
        return this.repository.find({where: {${fieldGeneric.name?uncap_first}: {${fieldGeneric.pojo.id.name}}}});
    }
        </#if>
    </#if>
</#list>


    public constructQuery(criteria: ${pojo.name}Criteria): SelectQueryBuilder<${pojo.name}> {
        const query = this.initQuery(this.repository);
    <#list pojo.fieldsSimple as fieldSimple>
        <#if  !fieldSimple.id>
            <#if  fieldSimple.dateTime || fieldSimple.localDate>
        this.addConstraintMinMax(query, criteria.${fieldSimple.name}From, criteria.${fieldSimple.name}To, '${fieldSimple.name} >= :${fieldSimple.name}From', '${fieldSimple.name} <= :${fieldSimple.name}To', {${fieldSimple.name}From: criteria.${fieldSimple.name}From,${fieldSimple.name}To: criteria.${fieldSimple.name}To,});
            <#elseif fieldSimple.nombre>
        this.addConstraintMinMax(query, criteria.${fieldSimple.name}Min, criteria.${fieldSimple.name}Max, '${fieldSimple.name} >= :${fieldSimple.name}Min', '${fieldSimple.name} <= :${fieldSimple.name}Max', {${fieldSimple.name}Min: criteria.${fieldSimple.name}Min,${fieldSimple.name}Max: criteria.${fieldSimple.name}Max,});
            <#elseif fieldSimple.bool>
        this.addConstraint(query, criteria.${fieldSimple.name}, '${fieldSimple.name} = :${fieldSimple.name}', {${fieldSimple.name}: criteria.${fieldSimple.name}});
            <#elseif !fieldSimple.large>
        this.addConstraint(query, criteria.${fieldSimple.name}, '${fieldSimple.name} = :${fieldSimple.name}', {${fieldSimple.name}: criteria.${fieldSimple.name}});
            </#if>
        </#if>
    </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
        if (criteria.${fieldGeneric.name}) {
            const ${fieldGeneric.name} = criteria.${fieldGeneric.name};
            this.addConstraint(query, criteria.${fieldGeneric.name}.id, '${fieldGeneric.name}.id = :${fieldGeneric.name}Id', {${fieldGeneric.name}Id: ${fieldGeneric.name}.id,});
            this.addConstraint(query, criteria.${fieldGeneric.name}.${fieldGeneric.typeAsPojo.labelOrReference.name}, '${fieldGeneric.name}.${fieldGeneric.typeAsPojo.labelOrReference.name} = :${fieldGeneric.name}${fieldGeneric.typeAsPojo.labelOrReference.name?cap_first}', {${fieldGeneric.name}${fieldGeneric.typeAsPojo.labelOrReference.name?cap_first}: ${fieldGeneric.name}.${fieldGeneric.typeAsPojo.labelOrReference.name},});
        }
    </#list>
        return query;
    }

}