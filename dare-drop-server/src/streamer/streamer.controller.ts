import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { StreamerService } from './streamer.service';

@Controller('streamer')
export class StreamerController {
  constructor(private streamerService: StreamerService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    if (!id) {
      throw new HttpException('Provide id', HttpStatus.BAD_REQUEST);
    }

    return this.streamerService.findOne(id);
  }
}
