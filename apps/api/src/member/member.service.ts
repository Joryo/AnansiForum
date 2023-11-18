import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Member } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

  async createMember(data: Prisma.MemberCreateInput): Promise<Member> {
    const { email, password } = data;
    const member = await this.prisma.member.findUnique({
      where: {
        email,
      },
    });

    if (member) {
      // Don't tell the user that the email is already taken
      throw new BadRequestException();
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    return this.prisma.member.create({
      data: {
        ...data,
        password: encryptedPassword,
      },
    });
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
