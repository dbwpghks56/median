import {Prisma, User} from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User{
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    password: string;
}
