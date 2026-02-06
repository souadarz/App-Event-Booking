import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from 'src/common/enums/Role.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userObject = user.toObject() as User & { password: string };
    const { password: _, ...result } = userObject;
    return result;
  }

  async login(user: Omit<User, 'password'> & { _id: string }) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.userService.findOne(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    const role = registerDto.role || Role.PARTICIPANT;

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = new this.userModel({
      ...registerDto,
      password: hashedPassword,
      role,
    });

    const savedUser = await user.save();

    const userObject = savedUser.toObject();
    const { password, ...result } = userObject;

    return result;
  }
}
