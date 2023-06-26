import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Streamer } from './streamer.entity';
import { User } from 'src/users/entities';

@Entity()
export class DownvoteUserStreamer extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  streamerId: string;

  @ManyToOne(() => User, (user) => user.downvoteStreamerConnection)
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Streamer, (streamer) => streamer.downvoteUserConnection)
  @JoinColumn({ name: 'streamerId' })
  streamer: Promise<Streamer>;
}
