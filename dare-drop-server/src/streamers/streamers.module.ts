import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamerModule } from 'src/streamer/streamer.module';

@Module({
  controllers: [StreamersController],
  imports: [StreamerModule],
})
export class StreamersModule {}
