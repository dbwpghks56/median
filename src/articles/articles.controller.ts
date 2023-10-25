import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/request/create-article.dto';
import {ApiTags, ApiOkResponse, ApiCreatedResponse} from '@nestjs/swagger'
import { UpdateArticleDto } from './dto/request/update-article.dto';
import { ArticleEntity } from './dto/response/articles.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({type: ArticleEntity})
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({type: ArticleEntity, isArray: true})
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: ArticleEntity})
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Get('drafts/ss')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
