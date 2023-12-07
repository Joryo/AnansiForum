import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Member } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto, UpdateMemberDto } from './member.dto';
import { MemberRoles } from 'src/enums/memberRoles';

@Injectable()
export class MemberService {
  constructor(private prisma: PrismaService) {}

  async member(
    userWhereUniqueInput: Prisma.MemberWhereUniqueInput,
  ): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async members(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MemberWhereUniqueInput;
    where?: Prisma.MemberWhereInput;
    orderBy?: Prisma.MemberOrderByWithRelationInput;
  }): Promise<Member[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.member.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMember(data: CreateMemberDto): Promise<Member> {
    const { email, password } = data;
    const existingMember = await this.prisma.member.findUnique({
      where: {
        email,
      },
    });

    if (existingMember) {
      // Don't tell the user that the email is already taken
      throw new BadRequestException();
    }

    const member: Prisma.MemberCreateInput = {
      ...data,
      email,
      name: data.name || '',
      role: data.role || MemberRoles.MEMBER,
      password: await this.encryptPassword(password),
    };

    return this.prisma.member.create({ data: member });
  }

  async updateMember(id: string, data: UpdateMemberDto): Promise<Member> {
    const member: Prisma.MemberUpdateInput = {
      ...data,
      password: data.password
        ? await this.encryptPassword(data.password)
        : undefined,
    };

    return this.prisma.member.update({
      data: member,
      where: { id: Number(id) },
    });
  }

  async deleteMember(id: string): Promise<Member> {
    return this.prisma.member.delete({
      where: { id: Number(id) },
    });
  }

  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
