import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetStreamerDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
