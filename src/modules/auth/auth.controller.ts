import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { ILoginPayload } from './interface/login.payload';
import { JwtAuthGuard } from './guards/jwt-auth.gard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sing-in')
  singin(@Body() loginPayload: ILoginPayload) {
    return this.authService.singIn(loginPayload);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('refresh-jwt'))
  refresh(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify() {
    return { valid: true };
  }
}
