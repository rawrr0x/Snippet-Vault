import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get one snippet by id' })
  @ApiParam({ name: 'id', description: 'Id of snippet' })
  @ApiResponse({ status: 200, description: 'Snippet has been found' })
  @Get(':id')
  async findOneById(@Req() req: Request, @Param('id') id: string) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];
    return this.snippetsService.findOneById(userEmail, id);
  }

  @ApiOperation({ summary: 'Update snippet' })
  @ApiBody({ description: 'Data for snippet updating', type: UpdateSnippetDto })
  @ApiResponse({ status: 201, description: 'Snippet has been updated' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSnippetDto,
    @Req() req: Request,
  ) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];

    return this.snippetsService.update(userEmail, id, dto);
  }

  @ApiOperation({ summary: 'Update snippet' })
  @ApiBody({ description: 'Data for snippet updating', type: UpdateSnippetDto })
  @ApiResponse({ status: 201, description: 'Snippet has been updated' })
  @Delete(':id')
  async delete(@Req() req: Request, @Param('id') id: string) {
    const cookies = req.cookies as { user_email: string };
    const userEmail = cookies['user_email'];
    return this.snippetsService.delete(userEmail, id);
  }
}
