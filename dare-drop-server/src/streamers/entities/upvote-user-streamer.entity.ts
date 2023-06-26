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
export class UpvoteUserStreamer extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  streamerId: string;

  @ManyToOne(() => User, (user) => user.upvoteStreamerConnection)
  @JoinColumn({ name: 'userId' })
  user: Promise<User>;

  @ManyToOne(() => Streamer, (streamer) => streamer.upvoteUserConnection)
  @JoinColumn({ name: 'streamerId' })
  streamer: Promise<Streamer>;
}
