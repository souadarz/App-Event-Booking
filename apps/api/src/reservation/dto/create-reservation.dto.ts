import { IsMongoId } from 'class-validator';

export class CreateReservationDto {
  @IsMongoId()
  userId: string;

  @IsMongoId()
  eventId: string;
}
