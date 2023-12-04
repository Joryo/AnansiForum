import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Req,
  UseGuards,
  ForbiddenException,
  Delete,
  HttpCode,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateMemberDto, MemberDto } from './member.dto';
import { MemberService } from './member.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MemberRoles } from 'src/enums/memberRoles';
import { jwtConstants } from 'src/auth/constants';

@ApiTags('Member')
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found member',
    type: MemberDto,
  })
  async findOne(@Param('id') id: string, @Req() { user }) {
    const member = await this.memberService.member({
      id: Number(id),
    });

    if (!member) {
      throw new NotFoundException("This member doesn't exist");
    }

    // Only connected admin can access other members
    if (user.role !== MemberRoles.ADMIN && user.id !== member.id) {
      throw new ForbiddenException(
        "You don't have the permission to access this member",
      );
    }

    return member;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created Member',
    type: MemberDto,
  })
  async create(
    @Body() member: CreateMemberDto,
    @Req() { headers: { authorization } },
  ) {
    // Only connected admin can create admins
    if (member.role === MemberRoles.ADMIN) {
      const token = authorization?.split(' ')[1];
      const user =
        token && (jwt.verify(token, jwtConstants.secret) as jwt.JwtPayload);

      if (user?.role !== MemberRoles.ADMIN) {
        throw new ForbiddenException(
          "You don't have the permission to create an admin",
        );
      }
    }

    return this.memberService.createMember(member);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() { user }): Promise<void> {
    const member = await this.memberService.member({
      id: Number(id),
    });
    if (!member) {
      throw new NotFoundException("This member doesn't exist");
    }
    if (user.role !== MemberRoles.ADMIN && user.id !== member.id) {
      throw new ForbiddenException(
        "You don't have the permission to delete this member",
      );
    }

    await this.memberService.deleteMember(id);
  }
}
