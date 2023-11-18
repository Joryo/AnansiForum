import { Controller, Get, Post, Body } from '@nestjs/common';
import { MemberDto } from './entities/member';
import { Member } from '@prisma/client';
import { MemberService } from './member.service';
import { Prisma } from '@prisma/client';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}
  @Get()
  get(): string {
    return 'Member 1';
  }

  @Post()
  async create(@Body() member: MemberDto): Promise<Member> {
    const memberCreateInput: Prisma.MemberCreateInput = {
      name: member.name,
      email: member.email,
      password: member.password,
      role: member.role,
    };

    return this.memberService.createMember(memberCreateInput);
  }
}
