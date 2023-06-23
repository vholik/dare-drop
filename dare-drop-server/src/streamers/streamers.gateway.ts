import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { VoteState } from './dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class StreamersGateway {
  @SubscribeMessage('create-streamer')
  createStreamer(
    @MessageBody() data: { id: number },
    @ConnectedSocket() socket: Socket,
  ) {
    if (!data.id) {
      throw new WsException('Provide id');
    }

    socket.broadcast.emit('get-streamer', data);
  }

  @SubscribeMessage('vote-streamer')
  voteStreamer(
    @MessageBody() data: { id: number; state: VoteState },
    @ConnectedSocket() socket: Socket,
  ) {
    if (!data.state) {
      throw new WsException('Provide vote state');
    }

    if (!data.id) {
      throw new WsException('Provide id');
    }

    socket.broadcast.emit('get-streamers-vote', data);
  }
}
