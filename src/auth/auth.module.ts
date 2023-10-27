import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from 'src/users/users.module';

export const jwtSecret = 'sksmsdiwjdtlsrhkroqkfwk';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: '5m'} // e.g. 30s, 7d. 24h
    }),
    UsersModule
  ]
})
export class AuthModule {}
