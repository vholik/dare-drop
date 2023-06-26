import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { CreateStreamerDto, VoteStreamerDto } from './dto';
import { AccessTokenGuard } from 'src/common/guards';
import { Request } from 'express';

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

  @UseGuards(AccessTokenGuard)
  @Put(':id/vote')
  vote(
    @Body() dto: VoteStreamerDto,
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const userId: string = req.user['sub'];

    if (!id) {
      throw new HttpException('Provide correct id', HttpStatus.BAD_REQUEST);
    }

    const { state } = dto;

    return this.streamersService.vote(id, state, userId);
  }
}
