import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/Role.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Req() req, @Body('eventId') eventId: string) {
    return this.reservationService.create(eventId, req.user.id);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    return this.reservationService.findAll();
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN, Role.PARTICIPANT)
  async findByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUser(userId);
  }

  @Get('event/:eventId')
  @Roles(Role.ADMIN)
  async findByEvent(@Param('eventId') eventId: string) {
    return this.reservationService.findByEvent(eventId);
  }
}
