import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  // get a custom configuration value
  const configService = app.get<ConfigService>(ConfigService);
  const server = configService.get('server');

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: server.origin });
    logger.log(`Accepting requests from origin "${server.origin}"`);
  }

  console.log(`port: ${server.port}`);
  const srvr = await app.listen(server.port, () => {
    const addr = srvr.address();
    const bind =
      typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    logger.log(`Listening on ${bind}`);
  });
}
bootstrap();
