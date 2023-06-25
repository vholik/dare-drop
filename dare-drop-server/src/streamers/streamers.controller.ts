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
import { StreamersService } from './streamers.service';
import { CreateStreamerDto, VoteStreamerDto } from './dto';

@Controller('streamers')
export class StreamersController {
  constructor(private streamersService: StreamersService) {}

  @Get()
  findAll() {
    return this.streamersService.findAll();
  }

  @Post()
  create(@Body() dto: CreateStreamerDto) {
    return this.streamersService.createStreamer(dto);
  }

  @Put(':id/vote')
  vote(@Body() dto: VoteStreamerDto, @Param('id') id: string) {
    if (!id) {
      throw new HttpException('Provide correct id', HttpStatus.BAD_REQUEST);
    }

    const { state } = dto;

    return this.streamersService.vote(id, state);
  }
}
