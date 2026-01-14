import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'), 
      }),
    }),
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'auth', 
            module: AuthModule,
            children: [
              { path: 'users', module: UsersModule }
            ],
          }
        ],
      }
    ])
  ]
})
export class AppModule {}
