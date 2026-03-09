import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async findOneByEmail(userEmail: string) {
    const user = await this.userModel.findOne({ email: userEmail }).exec();
    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel
      .findOne({ email: dto.email })
      .exec();

    if (existingUser) {
      throw new ConflictException('User already exist');
    }

    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async login(dto: LoginDto) {
    const user = await this.userModel.findOne({ email: dto.email }).exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
