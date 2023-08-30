import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
<#list subModules as subModule>
<#list subModule.pojos as pojo>
    <#if pojo.ignoreFront == false>
import { ${pojo.name} } from "src/app/controller/bean/core/${pojo.name}";
import { ${pojo.name}Dao } from "src/app/controller/dao/facade/core/${pojo.name}Dao";
import { ${pojo.name}Converter } from "src/app/controller/converter/${pojo.name}Converter";
import { ${pojo.name}Rest${role.name?cap_first} } from "src/app/module/${role.name?uncap_first}/ws/${pojo.name}Rest${role.name?cap_first}";
import { ${pojo.name}${role.name?cap_first}ServiceImpl } from "src/app/module/${role.name?uncap_first}/service/impl/${pojo.name}${role.name?cap_first}erviceImpl";
    </#if>
</#list>
</#list>

@Module({
    imports: [TypeOrmModule.forFeature([ <#list subModules as subModule><#list subModule.pojos as pojo > ${pojo.name} , </#list></#list>])],
    controllers: [<#list subModules as subModule><#list subModule.pojos as pojo > ${pojo.name}Rest${role.name?cap_first} , </#list></#list> ],
    providers: [ <#list subModules as subModule><#list subModule.pojos as pojo> ${pojo.name}${role.name?cap_first}ServiceImpl ,   ${pojo.name}Dao , ${pojo.name}Converter ,
                 </#list></#list> ],
})
export class ${role.name?cap_first}Module {}
