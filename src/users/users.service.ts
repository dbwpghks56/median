import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService){}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing
    );

    createUserDto.password = hashedPassword;

    return new UserEntity(await this.prisma.user.create({
      data: createUserDto
    }));
  }

  async findAll(): Promise<UserEntity[]> {
    return (await this.prisma.user.findMany()).map((user) => new UserEntity(user));
  }

  async findOne(id: number): Promise<UserEntity> {
    return new UserEntity(await this.prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    }));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return new UserEntity(await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto
    }));
  }

  async remove(id: number) {
    return new UserEntity(await this.prisma.user.delete({
      where: {
        id
      }
    }));
  }
}
