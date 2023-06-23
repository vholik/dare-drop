import {
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Platform } from '../entities';

export class CreateStreamerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEnum(Platform)
  platform: Platform;

  @IsString()
  @Length(3)
  @MaxLength(255)
  description: string;
}
