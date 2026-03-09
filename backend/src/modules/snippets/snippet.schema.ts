import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { SnippetType } from './enums/snippet-type.enum';

export type snippetDocument = HydratedDocument<Snippet>;

@Schema({ timestamps: true })
export class Snippet {
  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  tags: string[];

  @Prop({ enum: Object.values(SnippetType) })
  type: SnippetType;

  @Prop()
  userEmail: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SnippetSchema = SchemaFactory.createForClass(Snippet);
