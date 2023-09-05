import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Product} from "src/app/controller/bean/core/Product";
import {Purchase} from "src/app/controller/bean/core/Purchase";
import {PurchaseItem} from "src/app/controller/bean/core/PurchaseItem";
import {Client} from "src/app/controller/bean/core/Client";
import {ClientCategory} from "src/app/controller/bean/core/ClientCategory";
import { User } from "../app/module/auth/bean/User";
import { Role } from "../app/module/auth/bean/Role";

const  databaseProperties : TypeOrmModuleOptions =    {
    type: 'mysql',
    host: 'localhost',
    port: 3307,
    username:'root',
    password:'',
    database: 'nest-purchase-v3',
    synchronize:true,
    entities: [  Product ,  Purchase ,  PurchaseItem ,  Client ,  ClientCategory ,  User, Role],

};
export  default databaseProperties;
