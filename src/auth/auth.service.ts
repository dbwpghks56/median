import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/request/login.dto';
import { AuthResponse } from './dto/response/auth.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService,
        private readonly jwtService: JwtService){}

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: {
                email: loginDto.email
            }
        });

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if(!isPasswordValid) throw new UnauthorizedException('Invalid Password');

        return {
            accessToken: this.jwtService.sign({
                userId: user.id
            })
        };
    }
}
