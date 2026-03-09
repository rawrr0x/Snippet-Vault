import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Snippet } from './snippet.schema';
import { Model } from 'mongoose';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import { UsersService } from '../users/users.service';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<Snippet>,
    private readonly usersService: UsersService,
  ) {}

  async findOneById(userEmail: string, snippetId: string) {
    const snippet = await this.snippetModel.findOne({ _id: snippetId }).exec();

    if (!snippet || snippet.userEmail !== userEmail) {
      throw new NotFoundException('Snippet not found');
    }

    return snippet;
  }

  async findAllUserSnippets(userEmail: string): Promise<Snippet[]> {
    const user = await this.usersService.findOneByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userSnippets = await this.snippetModel.find({ userEmail }).exec();

    return userSnippets;
  }

  async create(userEmail: string, dto: CreateSnippetDto): Promise<Snippet> {
    const user = await this.usersService.findOneByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const createdSnippet = new this.snippetModel({ ...dto, userEmail });
    return createdSnippet.save();
  }

  async update(
    userEmail: string,
    snippetId: string,
    dto: UpdateSnippetDto,
  ): Promise<Snippet | null> {
    const snippet = await this.snippetModel.findOne({ _id: snippetId }).exec();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    const updatedSnippet = await this.snippetModel
      .findOneAndUpdate({ userEmail }, dto)
      .exec();

    return updatedSnippet;
  }

  async delete(userEmail: string, snippetId: string) {
    const user = await this.usersService.findOneByEmail(userEmail);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const snippet = await this.snippetModel.findOne({ _id: snippetId }).exec();

    if (!snippet) {
      throw new NotFoundException('Snippet not found');
    }

    return this.snippetModel.deleteOne({ _id: snippetId });
  }
}
