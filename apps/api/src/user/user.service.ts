import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).select('+password');
  }

  async findById(userId: string): Promise<UserDocument | null> {
    return this.userModel.findById(userId);
  }
}
