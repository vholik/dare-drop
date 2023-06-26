import { User } from 'src/users/entities';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UpvoteUserStreamer } from './upvote-user-streamer.entity';
import { DownvoteUserStreamer } from './downvote-user-streamer.entity';

export enum Platform {
  TWITCH = 'twitch',
  YOUTUBE = 'youtube',
  TIKTOK = 'tiktok',
  KICK = 'kick',
  RUMBLE = 'rumble',
}

const PHOTO_URL =
  'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    default: PHOTO_URL,
  })
  image: string;

  @Column({
    type: 'simple-enum',
    enum: Platform,
  })
  platform: Platform;

  @Column()
  description: string;

  @OneToMany(() => UpvoteUserStreamer, (us) => us.streamer)
  upvoteUserConnection: Promise<UpvoteUserStreamer[]>;

  @OneToMany(() => DownvoteUserStreamer, (us) => us.streamer)
  downvoteUserConnection: Promise<DownvoteUserStreamer[]>;
}
