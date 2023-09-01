import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./app/config/swagger.config";
import {ValidationPipe} from "@nestjs/common";
import corsOptions from "./app/config/cors.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsOptions);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(8036);
}
bootstrap();
