import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/request/create-article.dto';
import { UpdateArticleDto } from './dto/request/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Article} from '@prisma/client'
import { ArticleEntity } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService){}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return new ArticleEntity(await this.prisma.article.create({
      data: createArticleDto
    }));
  }

  async findAll(): Promise<Article[]> {
    return (await this.prisma.article.findMany({
      where: {
        published: true
      }
    })).map((article) => new ArticleEntity(article));
  }

  async findDrafts() {
    return this.prisma.article.findMany({
      where: {
        published: false
      },
    });
  }

  async findOne(id: number): Promise<Article> {
    return new ArticleEntity(await this.prisma.article.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        author: true
      }
    }));
    // exception filter 에서 prisma errorcode 받아서 자동으로 처리 가능
    // .catch(() => {throw new NotFoundException(`No.${id} Article is Not Found`)})
    
  
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id
      },
      data: updateArticleDto
    }).catch(() => { throw new NotFoundException(`No.${id} Article is Not Found`) });
  }

  async remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id
      }
    }).catch(() => { throw new NotFoundException(`No.${id} Article is Not Found`) });
  }
}
