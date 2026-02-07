import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schema/reservation.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EventService } from 'src/event/event.service';
import { ReservationStatus } from 'src/common/enums/Reservation-status.enum';
import { EventStatus } from 'src/common/enums/event-status.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    private readonly eventService: EventService,
  ) {}

  // Créer une réservation
  async create(dto: CreateReservationDto): Promise<ReservationDocument> {
    const event = await this.eventService.findById(dto.eventId);

    if (event.status !== EventStatus.PUBLISHED) {
      throw new BadRequestException(
        'Impossible de réserver un événement non publié ou annulé',
      );
    }

    const existingReservation = await this.reservationModel.findOne({
      user: dto.userId,
      event: dto.eventId,
    });
    if (
      existingReservation &&
      existingReservation.status !== ReservationStatus.CANCELED
    ) {
      throw new BadRequestException(
        'Vous avez déjà une réservation active pour cet événement.',
      );
    }

    const confirmedCount = await this.reservationModel.countDocuments({
      event: dto.eventId,
      status: ReservationStatus.CONFIRMED,
    });
    if (confirmedCount >= event.capacity) {
      throw new BadRequestException('L’événement est complet.');
    }

    const reservation = new this.reservationModel({
      user: dto.userId,
      event: dto.eventId,
      status: ReservationStatus.PENDING,
    });
    return reservation.save();
  }

  findAll() {
    return `This action returns all reservation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
