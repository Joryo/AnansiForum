import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Member } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateMemberDto } from './dto/member';
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

    const encryptedPassword = await bcrypt.hash(password, 10);

    const member: Prisma.MemberCreateInput = {
      ...data,
      email,
      name: data.name || '',
      role: data.role || MemberRoles.MEMBER,
      password: encryptedPassword,
    };

    return this.prisma.member.create({ data: member });
  }

  async updateMember(params: {
    where: Prisma.MemberWhereUniqueInput;
    data: Prisma.MemberUpdateInput;
  }): Promise<Member> {
    const { where, data } = params;
    return this.prisma.member.update({
      data,
      where,
    });
  }

  async deleteMember(where: Prisma.MemberWhereUniqueInput): Promise<Member> {
    return this.prisma.member.delete({
      where,
    });
  }
}
