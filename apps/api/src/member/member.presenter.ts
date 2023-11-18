import { ApiProperty } from '@nestjs/swagger';
import { Member } from '@prisma/client';

export class MemberGetPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;

  constructor(member: Member) {
    this.id = member.id;
    this.name = member.name;
    this.createdAt = member.createdAt;
  }
}

export class MemberCreatePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  role: string;

  constructor(member: Member) {
    this.id = member.id;
    this.name = member.name;
    this.email = member.email;
    this.role = member.role;
    this.createdAt = member.createdAt;
    this.updatedAt = member.updatedAt;
  }
}
