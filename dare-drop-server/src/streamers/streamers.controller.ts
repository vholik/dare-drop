import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStreamerDto, VoteStreamerDto } from 'src/streamer/dto';
import { StreamerService } from 'src/streamer/streamer.service';

@Controller('streamers')
export class StreamersController {
  constructor(private streamerService: StreamerService) {}

  @Get()
  findAll() {
    return this.streamerService.findAll();
  }

  @Post()
  create(@Body() dto: CreateStreamerDto) {
    return this.streamerService.createStreamer(dto);
  }

  @Put(':id/vote')
  vote(@Body() dto: VoteStreamerDto, @Param('id') id: number) {
    if (!id) {
      throw new HttpException('Provide correct id', HttpStatus.BAD_REQUEST);
    }

    const { state } = dto;

    return this.streamerService.vote(id, state);
  }
}
