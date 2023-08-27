import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Purchase} from "src/app/controller/bean/core/Purchase";
import {Product} from "src/app/controller/bean/core/Product";
import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import {Client} from "src/app/controller/bean/core/Client";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";

const  databaseProperties : TypeOrmModuleOptions =    {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username:'root',
    password:'',
    database: 'nest-purchase-v3',
    synchronize:true,
    entities: [  Purchase ,  Product ,  ClientCategory ,  Client ,  PurchaseItem , ],

};
export  default databaseProperties;
