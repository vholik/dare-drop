import { Module } from '@nestjs/common';
import { StreamerController } from './streamer.controller';
import { StreamersModule } from 'src/streamers/streamers.module';

@Module({
  imports: [StreamersModule],
  controllers: [StreamerController],
})
export class StreamerModule {}
