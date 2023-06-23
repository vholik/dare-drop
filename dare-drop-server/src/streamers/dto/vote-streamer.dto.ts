import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export enum VoteState {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

export class VoteStreamerDto {
  @IsNotEmpty()
  @IsEnum(VoteState)
  state: VoteState;
}
