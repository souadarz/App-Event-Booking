import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role.enum';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @Roles(Role.PARTICIPANT)
  async create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(id);
  }

  @Patch(':id/confirm')
  @Roles(Role.ADMIN)
  async confirm(@Param('id') id: string) {
    return this.reservationService.confirm(id);
  }

  @Patch(':id/refuse')
  @Roles(Role.ADMIN)
  async refuse(@Param('id') id: string) {
    return this.reservationService.refuse(id);
  }

  @Patch(':id/cancel')
  @Roles(Role.ADMIN, 'participant')
  async cancel(@Param('id') id: string) {
    return this.reservationService.cancel(id);
  }

  @Get('user/:userId')
  @Roles(Role.ADMIN, 'participant')
  async findByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUser(userId);
  }

  @Get('event/:eventId')
  @Roles(Role.ADMIN)
  async findByEvent(@Param('eventId') eventId: string) {
    return this.reservationService.findByEvent(eventId);
  }
}
