import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from "src/app/controller/bean/core/Purchase";
import { PurchaseDao } from "src/app/controller/dao/facade/core/PurchaseDao";
import { PurchaseConverter } from "src/app/controller/converter/PurchaseConverter";
import { PurchaseAdminRest } from "src/app/module/admin/ws/PurchaseAdminRest";
import { PurchaseAdminServiceImpl } from "src/app/module/admin/service/PurchaseAdminServiceImpl";
import { Product } from "src/app/controller/bean/core/Product";
import { ProductDao } from "src/app/controller/dao/facade/core/ProductDao";
import { ProductConverter } from "src/app/controller/converter/ProductConverter";
import { ProductAdminRest } from "src/app/module/admin/ws/ProductAdminRest";
import { ProductAdminServiceImpl } from "src/app/module/admin/service/ProductAdminServiceImpl";
import { ClientCategory } from "src/app/controller/bean/core/ClientCategory";
import { ClientCategoryDao } from "src/app/controller/dao/facade/core/ClientCategoryDao";
import { ClientCategoryConverter } from "src/app/controller/converter/ClientCategoryConverter";
import { ClientCategoryAdminRest } from "src/app/module/admin/ws/ClientCategoryAdminRest";
import { ClientCategoryAdminServiceImpl } from "src/app/module/admin/service/ClientCategoryAdminServiceImpl";
import { Client } from "src/app/controller/bean/core/Client";
import { ClientDao } from "src/app/controller/dao/facade/core/ClientDao";
import { ClientConverter } from "src/app/controller/converter/ClientConverter";
import { ClientAdminRest } from "src/app/module/admin/ws/ClientAdminRest";
import { ClientAdminServiceImpl } from "src/app/module/admin/service/ClientAdminServiceImpl";

@Module({
    imports: [TypeOrmModule.forFeature([  Purchase ,  PurchaseItem ,  Product ,  ClientCategory ,  Client , ])],
    controllers: [ PurchaseAdminRest ,  PurchaseItemAdminRest ,  ProductAdminRest ,  ClientCategoryAdminRest ,  ClientAdminRest ,  ],
    providers: [  PurchaseAdminServiceImpl ,   PurchaseDao , PurchaseConverter ,
                  PurchaseItemAdminServiceImpl ,   PurchaseItemDao , PurchaseItemConverter ,
                  ProductAdminServiceImpl ,   ProductDao , ProductConverter ,
                  ClientCategoryAdminServiceImpl ,   ClientCategoryDao , ClientCategoryConverter ,
                  ClientAdminServiceImpl ,   ClientDao , ClientConverter ,
                  ],
})
export class AdminModule {}
