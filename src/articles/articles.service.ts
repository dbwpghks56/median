import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/request/create-article.dto';
import { UpdateArticleDto } from './dto/request/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Article} from '@prisma/client'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService){}

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll(): Promise<Article[]> {
    return this.prisma.article.findMany({
      where: {
        published: true
      }
    });
  }

  findDrafts() {
    return this.prisma.article.findMany({
      where: {
        published: false
      },
    });
  }

  findOne(id: number): Promise<Article> {
    return this.prisma.article.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
