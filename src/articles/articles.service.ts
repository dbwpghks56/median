import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/request/create-article.dto';
import { UpdateArticleDto } from './dto/request/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Article} from '@prisma/client'

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService){}

  create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({
      data: createArticleDto
    });
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
    }).catch(() => {throw new NotFoundException(`No.${id} Article is Not Found`)});
  
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: {
        id
      },
      data: updateArticleDto
    }).catch(() => { throw new NotFoundException(`No.${id} Article is Not Found`) });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id
      }
    }).catch(() => { throw new NotFoundException(`No.${id} Article is Not Found`) });
  }
}
