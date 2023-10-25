import {ApiProperty} from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class CreateArticleDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    title: string;

    @ApiProperty({required: false})
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    description?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    body: string;

    @ApiProperty({required: false, default: false})
    @IsBoolean()
    @IsOptional()
    published?: boolean = false;
}
