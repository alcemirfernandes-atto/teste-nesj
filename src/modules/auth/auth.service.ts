import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ILoginPayload } from './interface/login.payload';
import { JwtRefreshPayload } from './interface/jwt-refresh-payload';
import { JWT_CONFIG } from './const/jwt-expire';
import { JwtAccessPayload } from './interface/jwt-access-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(loginPayload: ILoginPayload) {
    const user = await this.userRepository.findByEmailWithPassword(
      loginPayload.email,
    );

    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const ok = await bcrypt.compare(loginPayload.senha, user.senha);
    if (!ok) throw new UnauthorizedException('Senha incorreta');

    const accessPayload = { sub: user.id, type: 'access' };
    const refreshPayload = { sub: user.id, type: 'refresh' };

    return {
      accessToken: this.jwtService.sign(accessPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
      }),
      refreshToken: this.jwtService.sign(refreshPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: JWT_CONFIG.REFRESH_EXPIRES_IN,
      }),
    };
  }

  refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayload>(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return {
        accessToken: this.jwtService.sign(
          { sub: payload.sub, type: 'access' },
          {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: JWT_CONFIG.ACCESS_EXPIRES_IN,
          },
        ),
      };
    } catch {
      throw new UnauthorizedException(`Refresh token inválido`);
    }
  }

  verify(token: string) {
    this.jwtService.verify<JwtAccessPayload>(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
  }
}
