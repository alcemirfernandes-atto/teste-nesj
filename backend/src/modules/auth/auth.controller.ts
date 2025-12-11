import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginPayload } from './interface/login.payload';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from './decorators/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-in')
  singin(@Body() loginPayload: LoginPayload) {
    return this.authService.singIn(loginPayload);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('refresh-jwt'))
  @Post('refresh')
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @Auth()
  @Get('verify')
  verify() {
    return { valid: true };
  }
}
