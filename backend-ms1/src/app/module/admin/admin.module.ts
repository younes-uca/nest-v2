import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from "src/app/controller/bean/core/Purchase";
import { PurchaseDao } from "src/app/controller/dao/facade/core/PurchaseDao";
import { PurchaseConverter } from "src/app/controller/converter/PurchaseConverter";
import { PurchaseRestAdmin } from "src/app/module/admin/ws/PurchaseRestAdmin";
import { PurchaseAdminServiceImpl } from "src/app/module/admin/service/impl/PurchaseAdminerviceImpl";
import { Product } from "src/app/controller/bean/core/Product";
import { ProductDao } from "src/app/controller/dao/facade/core/ProductDao";
import { ProductConverter } from "src/app/controller/converter/ProductConverter";
import { ProductRestAdmin } from "src/app/module/admin/ws/ProductRestAdmin";
import { ProductAdminServiceImpl } from "src/app/module/admin/service/impl/ProductAdminerviceImpl";
import { ClientCategory } from "src/app/controller/bean/core/ClientCategory";
import { ClientCategoryDao } from "src/app/controller/dao/facade/core/ClientCategoryDao";
import { ClientCategoryConverter } from "src/app/controller/converter/ClientCategoryConverter";
import { ClientCategoryRestAdmin } from "src/app/module/admin/ws/ClientCategoryRestAdmin";
import { ClientCategoryAdminServiceImpl } from "src/app/module/admin/service/impl/ClientCategoryAdminerviceImpl";
import { Client } from "src/app/controller/bean/core/Client";
import { ClientDao } from "src/app/controller/dao/facade/core/ClientDao";
import { ClientConverter } from "src/app/controller/converter/ClientConverter";
import { ClientRestAdmin } from "src/app/module/admin/ws/ClientRestAdmin";
import { ClientAdminServiceImpl } from "src/app/module/admin/service/impl/ClientAdminerviceImpl";

@Module({
    imports: [TypeOrmModule.forFeature([  Purchase ,  PurchaseItem ,  Product ,  ClientCategory ,  Client , ])],
    controllers: [ PurchaseRestAdmin ,  PurchaseItemRestAdmin ,  ProductRestAdmin ,  ClientCategoryRestAdmin ,  ClientRestAdmin ,  ],
    providers: [  PurchaseAdminServiceImpl ,   PurchaseDao , PurchaseConverter ,
                  PurchaseItemAdminServiceImpl ,   PurchaseItemDao , PurchaseItemConverter ,
                  ProductAdminServiceImpl ,   ProductDao , ProductConverter ,
                  ClientCategoryAdminServiceImpl ,   ClientCategoryDao , ClientCategoryConverter ,
                  ClientAdminServiceImpl ,   ClientDao , ClientConverter ,
                  ],
})
export class AdminModule {}
