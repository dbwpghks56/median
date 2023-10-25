import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 여기서 의미하는 whitelist 는 validation 데코레이션( 어노테이션 ) 이 있는 필드를 말한다.
  // 즉, validation 데코레이션이 없다면 자동으로 필터링 된다는 뜻.
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Median')
  .setDescription('The Median API description')
  .setVersion('0.1')
  .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
