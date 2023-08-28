import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseProperties from 'src/resources/database.properties';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './app/module/admin/admin.module';
import { AuthModule } from './app/module/auth/auth.module';
import { AuthController } from './app/module/auth/ws/auth.controller';
import { AuthService } from './app/module/auth/service/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(databaseProperties), AdminModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
