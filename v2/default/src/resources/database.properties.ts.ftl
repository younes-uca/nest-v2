import {TypeOrmModuleOptions} from "@nestjs/typeorm";
<#list pojos as pojo >
import {${pojo.name}} from "src/app/controller/bean/core/${pojo.name}";
</#list>

const  databaseProperties : TypeOrmModuleOptions =    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'',
    database: 'nest-purchase-v3',
    synchronize:true,
    entities: [ <#list pojos as pojo > ${pojo.name?cap_first} , </#list>],

};
export  default databaseProperties;
