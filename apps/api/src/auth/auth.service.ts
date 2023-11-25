import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/member/member.service';
import { Member } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

  async login(member: Member) {
    const payload = { email: member.email, id: member.id, role: member.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
