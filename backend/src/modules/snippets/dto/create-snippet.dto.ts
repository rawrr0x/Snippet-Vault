import { IsArray, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SnippetType } from '../enums/snippet-type.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSnippetDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(SnippetType)
  type: SnippetType;
}
