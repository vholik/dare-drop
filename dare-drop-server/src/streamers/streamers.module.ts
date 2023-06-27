import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersService } from './streamers.service';
import { StreamersGateway } from './streamers.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './entities';
import { User } from 'src/users/entities';
import { UpvoteUserStreamer } from './entities/upvote-user-streamer.entity';
import { DownvoteUserStreamer } from './entities/downvote-user-streamer.entity';

@Module({
  controllers: [StreamersController],
  imports: [
    TypeOrmModule.forFeature([
      Streamer,
      User,
      UpvoteUserStreamer,
      DownvoteUserStreamer,
    ]),
  ],
  providers: [StreamersService, StreamersGateway],
  exports: [StreamersService],
})
export class StreamersModule {}
