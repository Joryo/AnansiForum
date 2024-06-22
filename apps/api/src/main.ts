import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  //TODO: Push origin to env variable
  app.enableCors({
    origin: 'http://localhost:3000', //TODO: Use env variable
    exposedHeaders: ['X-Access-Token', 'Set-Cookie', 'X-Total-Count'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Anansi Forum API')
    .setDescription('The Anansi Forum API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  //TODO: Use env variable
  await app.listen(3002);
}

bootstrap();
