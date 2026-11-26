import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressController } from './progress.controller';
import { ProgressRecord } from './entities/progress-record.entity';
import { ProgressService } from './progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressRecord])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService],
})
export class ProgressModule {}
