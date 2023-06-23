import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { StreamersService } from 'src/streamers/streamers.service';

@Controller('streamer')
export class StreamerController {
  constructor(private streamersService: StreamersService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    if (!id) {
      throw new HttpException('Provide id', HttpStatus.BAD_REQUEST);
    }

    return this.streamersService.findOne(id);
  }
}
