import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from 'src/streamers/entities';
import { Repository } from 'typeorm';
import { CreateStreamerDto, VoteState } from './dto';
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
  ) {}

  async findOne(id: string) {
    const streamer = await this.streamersRepository.findOneBy({ id: id });

    return streamer;
  }

  async findAll(userId?: string) {
    const allStreamers = await this.streamersRepository.find({
      order: {
        id: 'DESC',
      },
    });

    if (userId) {
      const authMapped = await Promise.all(
        allStreamers.map(async (streamer) => {
          const { id } = streamer;

          return {
            ...streamer,
            isDownvoted: await this.isAlreadyDownvoted(id, userId),
            isUpvoted: await this.isAlreadyUpvoted(id, userId),
            count: await this.getStreamerCount(id),
          };
        }),
      );

      return authMapped;
    }

    const mapped = await Promise.all(
      allStreamers.map(async (streamer) => {
        const { id } = streamer;

        return {
          ...streamer,
          count: await this.getStreamerCount(id),
        };
      }),
    );

    return mapped;
  }

  async createStreamer(dto: CreateStreamerDto) {
    const newStreamer = this.streamersRepository.create(dto);

    return await this.streamersRepository.save(newStreamer);
  }

  async isAlreadyUpvoted(streamerId: string, userId: string) {
    return await this.upvoteUserStreamerRepository.exist({
      where: {
        streamerId,
        userId,
      },
    });
  }

  async isAlreadyDownvoted(streamerId: string, userId: string) {
    return await this.downvoteUserStreamerRepository.exist({
      where: {
        streamerId,
        userId,
      },
    });
  }

  async upvoteStreamer(streamerId: string, userId: string) {
    const isAlreadyUpvoted = await this.isAlreadyUpvoted(streamerId, userId);
    await this.downvoteUserStreamerRepository.delete({ streamerId, userId });

    if (isAlreadyUpvoted) {
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
    await this.upvoteUserStreamerRepository.delete({ streamerId, userId });

    const isAlreadyDownvoted = await this.isAlreadyDownvoted(
      streamerId,
      userId,
    );

    if (isAlreadyDownvoted) {
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

  async getStreamerCount(streamerId: string) {
    const upvoteCount = await this.upvoteUserStreamerRepository.countBy({
      streamerId,
    });

    const downvoteCount = await this.downvoteUserStreamerRepository.countBy({
      streamerId,
    });

    return upvoteCount - downvoteCount || 0;
  }

  async vote(streamerId: string, vote: VoteState, userId: string) {
    if (vote === VoteState.UPVOTE) {
      await this.upvoteStreamer(streamerId, userId);
    } else {
      await this.downvoteStreamer(streamerId, userId);
    }

    return await this.getStreamerCount(streamerId);
  }
}
