import { createZodDto } from 'nestjs-zod/dto';
import { MemberSchemas } from '@repo/schemas';

export class CreateMemberDto extends createZodDto(MemberSchemas.CreateMember) {}

export class UpdateMemberDto extends createZodDto(MemberSchemas.UpdateMember) {}

export class MemberDto extends createZodDto(MemberSchemas.Member) {}
