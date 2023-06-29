import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { StreamersService } from './streamers.service';
import { CustomSocket } from 'src/authentication/lib';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class StreamersGateway {
  constructor(private streamersService: StreamersService) {}

  @SubscribeMessage('create-streamer')
  createStreamer(@ConnectedSocket() socket: Socket) {
    socket.broadcast.emit('get-new-streamer');
  }

  @SubscribeMessage('vote-streamer')
  async voteStreamer(
    @MessageBody() data: { id: string },
    @ConnectedSocket() socket: CustomSocket,
  ) {
    if (!data || !data.id) {
      throw new WsException('Provide id');
    }

    const res = {
      id: data.id,
      voteCount: await this.streamersService.getStreamerCount(data.id),
    };

    socket.broadcast.emit('get-streamer-vote', res);
  }
}
