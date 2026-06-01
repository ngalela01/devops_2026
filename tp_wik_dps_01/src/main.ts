import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PING_LISTEN_PORT ?? process.env.PORT ?? 8080);

  await app.listen(port);
}
bootstrap();
console.log('http://localhost:8080/ping');
