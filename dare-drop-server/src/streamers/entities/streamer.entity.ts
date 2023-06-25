import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'int', default: 0 })
  voteCount: number;
}
