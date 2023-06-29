import { IoAdapter } from '@nestjs/platform-socket.io';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { INestApplicationContext } from '@nestjs/common';

export interface CustomSocket extends Socket {
  userId: string;
}

export class AuthAdapter extends IoAdapter {
  constructor(private app: INestApplicationContext) {
    super(app);
  }
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, { ...options, cors: true });
    server.use((socket: CustomSocket, next) => {
      const bearerToken = socket.handshake.query.Authorization as string;
      if (bearerToken) {
        const token = bearerToken.split(' ')[1];

        verify(token, process.env.JWT_ACCESS_SECRET, async (err, decoded) => {
          if (err) {
            next(new Error('Authentication error'));
          } else {
            const userId = (decoded as any).userId;

            socket.userId = userId;
            next();
          }
        });
      } else {
        next(new Error('Authentication error'));
      }
    });
    return server;
  }
}
