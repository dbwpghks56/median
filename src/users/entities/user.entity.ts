import {Prisma, User} from '@prisma/client'
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity implements User{
    constructor(particial: Partial<UserEntity>) {
        // 2번째 인수를 1번째로 할당
        Object.assign(this, particial);
    }

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

    @Exclude()
    password: string;
}
