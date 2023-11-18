import { createZodDto } from 'nestjs-zod/dto';
import { CreateMember, UpdateMember, Member } from '@repo/schemas';

export class CreateMemberDto extends createZodDto(CreateMember) {}

export class UpdateMemberDto extends createZodDto(UpdateMember) {}

export class MemberDto extends createZodDto(Member) {}
