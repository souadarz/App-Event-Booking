import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Event } from './schema/event.schema';

@Injectable()
export class EventService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(dto: CreateEventDto): Promise<Event> {
    const exists = await this.eventModel.findOne({
      title: dto.title,
      date: dto.date,
    });
    if (exists) {
      throw new BadRequestException(
        'Un événement avec le même titre et la même date existe déjà.',
      );
    }

    if (dto.capacity <= 0) {
      throw new BadRequestException('la capacité doit être supérieure à 0');
    }

    const eventDate = new Date(dto.date);
    const now = new Date();
    if (eventDate <= now) {
      throw new BadRequestException(
        "La date de l'événement doit être dans le futur",
      );
    }

    const newEvent = await this.eventModel.create(dto);
    return newEvent;
  }

  async findAll(): Promise<Event[]>{
    const allEvent = await this.eventModel.find();
    return allEvent;
  }

  async findById(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('Événement introuvable');
    }
    return event;
  }

  // update event
  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.findById(id);

    if (dto.capacity !== undefined && dto.capacity <= 0) {
      throw new BadRequestException('La capacité doit être supérieure à 0.');
    }

    if (dto.date) {
      const newDate = new Date(dto.date);
      const now = new Date();
      if (newDate <= now) {
        throw new BadRequestException(
          "La date de l'événement doit être dans le futur.",
        );
      }
    }

    if (dto.title || dto.date) {
      const duplicate = await this.eventModel.findOne({
        _id: { $ne: id },
        title: dto.title ?? event.title,
        date: dto.date ?? event.date,
      });
      if (duplicate) {
        throw new BadRequestException(
          'Un événement avec le même titre et la même date existe déjà.',
        );
      }
    }

    Object.assign(event, dto);
    return event.save();
  }

  //supprimer event
  async remove(id: string): Promise<Event> {
    const event = await this.findById(id);
    return event.remove();
  }
}
