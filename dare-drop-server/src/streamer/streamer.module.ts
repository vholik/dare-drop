import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './entities';
import { StreamerGateway } from './streamer.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer])],
  controllers: [StreamerController],
  providers: [StreamerService, StreamerGateway],
  exports: [StreamerService],
})
export class StreamerModule {}
