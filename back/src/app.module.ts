import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.APP_DB_HOST,
      port: parseInt(process.env.APP_DB_PORT, 10) || 5432,
      database: process.env.APP_DB_DATABASE,
      username: process.env.APP_DB_USERNAME,
      password: process.env.APP_DB_PASSWORD,
      synchronize: false,
      autoLoadEntities: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
