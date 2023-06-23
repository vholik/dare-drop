import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { StreamersGateway } from './streamers.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './entities';

@Module({
  controllers: [StreamersController],
  imports: [TypeOrmModule.forFeature([Streamer])],
  providers: [StreamersService, StreamersGateway],
  exports: [StreamersService],
})
export class StreamersModule {}
