import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

<#if pojo.dependencies??>
    <#list pojo.dependencies as dependency>
        <#if dependency?? && dependency.name??>
import {${dependency.name}} from "src/app/controller/bean/core/${dependency.name}";
        </#if>
    </#list>
</#if>

<#if pojo.actor>
import {User} from "src/app/module/auth/bean/User";
<#else>
import {AuditBusinessObject} from "src/app/zynerator/audit/AuditBusinessObject";
</#if>

@Entity('${pojo.formatedDataBase}')
export class ${pojo.name} <#if pojo.actor> extends User <#else> extends AuditBusinessObject</#if> {

    @PrimaryGeneratedColumn()
    id: number;
<#list pojo.fieldsSimple as fieldSimple>
<#if pojo.id.name != fieldSimple.name>
    <#if fieldSimple.id == false>
    <#if fieldSimple.pureString>
    @Column({ length: 500 })
    ${fieldSimple.name?uncap_first}: string;
    </#if>
    <#if fieldSimple.nombre>
    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    ${fieldSimple.name?uncap_first}: number;
    </#if>
    <#if fieldSimple.bool>
    @Column({ default: false })
    ${fieldSimple.name?uncap_first}: boolean;
    </#if>
    <#if fieldSimple.type.simpleName == "Date" ||  fieldSimple.dateTime>
    @Column()
    ${fieldSimple.name?uncap_first}: Date;
    </#if>
</#if>
    </#if>
    </#list>
    <#list pojo.fieldsGeneric as fieldGeneric>
    <#if fieldGeneric.pojo??>
    @ManyToOne(() => ${fieldGeneric.pojo.name}, { eager: true })
    ${fieldGeneric.name?uncap_first}: ${fieldGeneric.pojo.name};
    </#if>
    </#list>
    <#list pojo.fields as field>
    <#if field.list>
    @OneToMany(() => ${field.typeAsPojo.name}, ${field.typeAsPojo.name?uncap_first} => ${field.typeAsPojo.name?uncap_first}.${pojo.name?uncap_first})
    ${field.name?uncap_first}: ${field.typeAsPojo.name}[];
    </#if>
    </#list>
}
