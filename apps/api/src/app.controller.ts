import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ApiExcludeEndpoint, ApiBody, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenDto } from './dto/accessToken';
import { LoginDto } from './dto/login';

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
  async login(@Request() req): Promise<AccessTokenDto> {
    return this.authService.login(req.user);
  }

  @ApiExcludeEndpoint()
  @UseGuards(JwtAuthGuard)
  @Get('auth/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
