import { Streamer } from 'src/streamers/entities';
import { DownvoteUserStreamer } from 'src/streamers/entities/downvote-user-streamer.entity';
import { UpvoteUserStreamer } from 'src/streamers/entities/upvote-user-streamer.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshToken: string;

  @OneToMany(() => UpvoteUserStreamer, (ub) => ub.user)
  upvoteStreamerConnection: Promise<UpvoteUserStreamer[]>;

  @OneToMany(() => DownvoteUserStreamer, (ub) => ub.user)
  downvoteStreamerConnection: Promise<DownvoteUserStreamer[]>;
}
