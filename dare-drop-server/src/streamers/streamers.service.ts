import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from 'src/streamers/entities';
import { Repository } from 'typeorm';
import { CreateStreamerDto, VoteState } from './dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities';
import { UpvoteUserStreamer } from './entities/upvote-user-streamer.entity';
import { DownvoteUserStreamer } from './entities/downvote-user-streamer.entity';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private streamersRepository: Repository<Streamer>,
    @InjectRepository(UpvoteUserStreamer)
    private upvoteUserStreamerRepository: Repository<UpvoteUserStreamer>,
    @InjectRepository(DownvoteUserStreamer)
    private downvoteUserStreamerRepository: Repository<DownvoteUserStreamer>,
    private usersService: UsersService,
  ) {}

  async findOne(id: string) {
    const streamer = await this.streamersRepository.findOneBy({ id: id });

    return streamer;
  }

  async findAll() {
    const allStreamers = await this.streamersRepository.find({
      order: {
        id: 'DESC',
      },
    });

    return allStreamers;
  }

  async createStreamer(dto: CreateStreamerDto) {
    const newStreamer = this.streamersRepository.create(dto);

    return await this.streamersRepository.save(newStreamer);
  }

  async upvoteStreamer(streamerId: string, userId: string) {
    const isUserAlreadyUpvoted =
      await this.upvoteUserStreamerRepository.findOneBy({ streamerId, userId });

    if (isUserAlreadyUpvoted) {
      await this.upvoteUserStreamerRepository.delete({ streamerId, userId });
    } else {
      await this.upvoteUserStreamerRepository
        .create({
          userId,
          streamerId,
        })
        .save();
    }
  }

  async downvoteStreamer(streamerId: string, userId: string) {
    const isUserAlreadyDownvoted =
      await this.downvoteUserStreamerRepository.findOneBy({
        streamerId,
        userId,
      });

    if (isUserAlreadyDownvoted) {
      await this.downvoteUserStreamerRepository.delete({ streamerId, userId });
    } else {
      await this.downvoteUserStreamerRepository
        .create({
          userId,
          streamerId,
        })
        .save();
    }
  }

  async vote(streamerId: string, vote: VoteState, userId: string) {
    if (vote === VoteState.UPVOTE) {
      console.log('upvote');
      await this.upvoteStreamer(streamerId, userId);
    } else {
      console.log('downvote');
      await this.downvoteStreamer(streamerId, userId);
    }

    const upvoteCount = await this.upvoteUserStreamerRepository.countBy({
      streamerId,
      userId,
    });

    const downvoteCount = await this.downvoteUserStreamerRepository.countBy({
      streamerId,
      userId,
    });

    return { upvoteCount, downvoteCount };
  }
}
