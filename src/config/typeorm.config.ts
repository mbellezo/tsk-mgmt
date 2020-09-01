import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  private logger = new Logger('typeOrmConfig');

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const database = this.configService.get('database');

    const config: TypeOrmModuleOptions = {
      type: 'postgres',
      host: String(database.host),
      port: Number(database.port),
      username: String(database.username),
      password: String(database.password),
      database: String(database.database),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: Boolean(database.synchronize),
    };

    this.logger.log(config);

    return config;
  }
}
