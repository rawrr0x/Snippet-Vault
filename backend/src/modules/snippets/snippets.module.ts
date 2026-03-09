import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Snippet, SnippetSchema } from './snippet.schema';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Snippet.name, schema: SnippetSchema }]),
    UsersModule,
  ],
  providers: [SnippetsService],
  controllers: [SnippetsController],
  exports: [SnippetsService],
})
export class SnippetsModule {}
