import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { TrainersModule } from './trainers/trainers.module';
import { WorkoutPlansModule } from './workout-plans/workout-plans.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 3306),
        username: config.get<string>('DB_USERNAME', 'root'),
        password: config.get<string>('DB_PASSWORD', ''),
        database: config.get<string>('DB_NAME', 'fittrack'),
        autoLoadEntities: true,
        synchronize: config.get('DB_SYNCHRONIZE', 'false') === 'true',
        logging: config.get('DB_LOGGING', 'false') === 'true',
      }),
    }),
    AuthModule,
    MembersModule,
    TrainersModule,
    WorkoutPlansModule,
    SchedulesModule,
    ProgressModule,
  ],
})
export class AppModule {}
