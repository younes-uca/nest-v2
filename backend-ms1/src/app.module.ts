import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseProperties from "src/resources/database.properties.ts.ftl";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdminModule} from "./app/module/admin/role.module.ts.ftl";

@Module({
  imports: [TypeOrmModule.forRoot(databaseProperties), AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
