import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateMemberDto, MemberDto } from './dto/member';
import { MemberService } from './member.service';
import { Prisma, Member } from '@prisma/client';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found member',
    type: MemberDto,
  })
  async findOne(@Param('id') id: string): Promise<Member> {
    const member: Member = await this.memberService.member({
      id: Number(id),
    });

    if (!member) {
      throw new NotFoundException("This member doesn't exist");
    }

    return member;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created Member',
    type: MemberDto,
  })
  async create(@Body() member: CreateMemberDto): Promise<Member> {
    const memberCreateInput: Prisma.MemberCreateInput = {
      name: member.name,
      email: member.email,
      password: member.password,
      role: member.role,
    };

    return this.memberService.createMember(memberCreateInput);
  }
}
