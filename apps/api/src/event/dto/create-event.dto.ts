import { IsDateString, IsInt, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(10)
  capacity: number;
}
