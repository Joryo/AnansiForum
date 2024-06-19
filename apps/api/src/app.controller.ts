import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiExcludeEndpoint, ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenDto } from './commons/dto/accessToken';
import { LoginDto } from './commons/dto/login';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Access Token',
    type: AccessTokenDto,
  })
  async login(@Request() req, @Res() res) {
    this.authService.login(req.user, res);
  }

  @ApiTags('Auth')
  @Post('auth/refresh')
  async logout(@Request() req, @Res() res) {
    if (!req.cookies?.refresh_token) {
      res.status(401).send();
      return;
    }
    this.authService.refresh(req.cookies.refresh_token, res);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
