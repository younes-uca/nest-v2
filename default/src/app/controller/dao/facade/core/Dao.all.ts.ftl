import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";

@Injectable()
export class ${pojo.name}Dao {

    constructor(@InjectRepository(${pojo.name}) private readonly repository: Repository<${pojo.name}>,) { }

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

}