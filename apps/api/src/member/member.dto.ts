import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { MemberRoles } from '../enums/memberRoles';

const BaseMemberSchema = z.object({
  email: z.string().email().describe('Email of the member'),
  name: z.string().describe('Name of the member'),
  password: z.string().min(8).max(100).describe('Password of the member'),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

const CreateMemberSchema = BaseMemberSchema.extend({
  role: z
    .nativeEnum(MemberRoles)
    .optional()
    .default(MemberRoles.MEMBER)
    .describe('Role of the member'),
});

const MemberSchema = CreateMemberSchema.extend({
  id: z.number().int().describe('Id of the member'),
});

export class CreateMemberDto extends createZodDto(CreateMemberSchema) {}
export class MemberDto extends createZodDto(MemberSchema) {}
