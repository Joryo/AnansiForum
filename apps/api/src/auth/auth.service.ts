import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/member/member.service';
import { Member } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

type Login = {
  accessToken: string;
  refreshToken: string;
};

type Payload = {
  email: string;
  id: number;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateMember(email: string, pass: string): Promise<Member | null> {
    const member = await this.memberService.member({ email });
    if (!member) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(pass, member.password);
    if (isPasswordValid) {
      return member;
    }
    return null;
  }

  async login(member: Member, res) {
    const payload = this.getMemberPayload(member);

    const refreshToken = await this.getNewRefreshToken(member, payload);

    const login = {
      accessToken: this.getNewAccessToken(payload),
      refreshToken,
    };

    this.sendLoginResponse(login, res, member);
  }

  async refresh(refreshToken: string, res: Response) {
    const payload = this.jwtService.verify(refreshToken);
    const member = await this.memberService.member({
      id: payload.id,
    });

    if (!member) {
      throw new Error('Member not found');
    }

    const isRefreshTokenValid = bcrypt.compare(
      refreshToken,
      member.refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new Error('Refresh token is not valid');
    }

    const newPayload = this.getMemberPayload(member);
    const newRefreshToken = await this.getNewRefreshToken(member, newPayload);

    const login = {
      accessToken: this.getNewAccessToken(newPayload),
      refreshToken: newRefreshToken,
    };

    this.sendLoginResponse(login, res, null);
  }

  async loginMember(member: Member, res) {
    const payload = this.getMemberPayload(member);
    const refreshToken = await this.getNewRefreshToken(member, payload);

    const login = {
      accessToken: this.getNewAccessToken(payload),
      refreshToken,
    };

    this.sendLoginResponse(login, res, member);
  }

  getNewAccessToken(payload: Payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }

  async getNewRefreshToken(member: Member, payload: Payload) {
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '30d',
    });

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.memberService.updateRefreshToken(
      member.id.toString(),
      refreshTokenHash,
    );

    return refreshToken;
  }

  getMemberPayload(member: Member) {
    return {
      email: member.email,
      id: member.id,
      role: member.role,
    };
  }

  //TODO: Hide crypted refresh token in member (look at DTO ?)
  sendLoginResponse(login: Login, res, member) {
    res.cookie('refresh_token', login.refreshToken, {
      httpOnly: true,
      secure: process.env.ENV !== 'local',
      sameSite: 'strict',
    });

    res.header('X-Access-token', login.accessToken);
    res.json({
      ...member,
    });
  }
}
