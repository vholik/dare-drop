import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from 'src/streamers/entities';
import { Repository } from 'typeorm';
import { CreateStreamerDto, VoteState } from './dto';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private streamersRepository: Repository<Streamer>,
  ) {}

  async findOne(id: number) {
    const streamer = await this.streamersRepository.findOneBy({ id: id });

    return streamer;
  }

  async findAll() {
    const allStreamers = await this.streamersRepository.find();

    return allStreamers;
  }

  async createStreamer(dto: CreateStreamerDto) {
    const newStreamer = this.streamersRepository.create(dto);

    return await this.streamersRepository.save(newStreamer);
  }

  async vote(id: number, state: VoteState) {
    if (state === VoteState.UPVOTE) {
      await this.streamersRepository.increment({ id }, 'voteCount', 1);
    } else {
      await this.streamersRepository.decrement({ id }, 'voteCount', 1);
    }

    const streamer = await this.streamersRepository.findOne({
      where: { id },
      select: ['voteCount'],
    });

    if (!streamer) {
      throw new HttpException('Streamer not found', HttpStatus.BAD_REQUEST);
    }

    return { voteCount: streamer.voteCount };
  }
}
