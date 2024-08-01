import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {patchNestJsSwagger} from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';

patchNestJsSwagger();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());

    app.enableCors({
        origin: process.env.FRONT_URL,
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

    await app.listen(process.env.LISTENING_PORT);
}

bootstrap();
