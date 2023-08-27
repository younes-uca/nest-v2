import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseProperties from "src/resources/database.properties";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AdminModule} from "./app/module/admin/admin.module";

@Module({
  imports: [TypeOrmModule.forRoot(databaseProperties), AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
