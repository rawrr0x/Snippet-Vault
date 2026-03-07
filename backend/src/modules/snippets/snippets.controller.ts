import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SnippetsService } from './snippets.service';
import { CreateSnippetDto } from './dto/create-snippet.dto';
import type { Request } from 'express';
import { UpdateSnippetDto } from './dto/update-snippet.dto';

@ApiTags('snippets')
@Controller('snippets')
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @ApiOperation({ summary: 'Get all user snippets' })
  @Get()
  async getAllUserSnippets(@Req() req: Request) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];
    return this.snippetsService.findAllUserSnippets(userEmail);
  }

  @ApiOperation({ summary: 'Create snippet' })
  @ApiBody({ description: 'Data for snippet creating', type: CreateSnippetDto })
  @ApiResponse({ status: 201, description: 'Snippet has been created' })
  @Post()
  async create(@Body() dto: CreateSnippetDto, @Req() req: Request) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];

    return this.snippetsService.create(userEmail, dto);
  }

  @ApiOperation({ summary: 'Update snippet' })
  @ApiBody({ description: 'Data for snippet updating', type: UpdateSnippetDto })
  @ApiResponse({ status: 201, description: 'Snippet has been updated' })
  @Post()
  async update(@Body() dto: UpdateSnippetDto, @Req() req: Request) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];

    return this.snippetsService.update(userEmail, dto);
  }
}
