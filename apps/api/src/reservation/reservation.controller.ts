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
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Roles } from 'src/common/decorators/role.decorator';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @Roles('participant')
  async create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }

  @Patch(':id/cancel')
  @Roles('admin', 'participant')
  async cancel(@Param('id') id: string) {
    return this.reservationService.cancel(id);
  }

  @Get('user/:userId')
  @Roles('admin', 'participant')
  async findByUser(@Param('userId') userId: string) {
    return this.reservationService.findByUser(userId);
  }
}
