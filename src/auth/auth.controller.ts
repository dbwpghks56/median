import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './dto/response/auth.response';
import { LoginDto } from './dto/request/login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({type: AuthResponse})
  async login(@Body() {email, password} : LoginDto) {
    return await this.authService.login({email, password});
  }
}
