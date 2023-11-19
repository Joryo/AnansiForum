import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const BaseMemberSchema = z.object({
  email: z.string().email().describe('Email of the member'),
  name: z.string().describe('Name of the member'),
  role: z.enum(['admin', 'member']).describe('Role of the member'),
  password: z.string().min(8).max(100).describe('Password of the member'),
});

const CreateMemberSchema = BaseMemberSchema.extend({});

const MemberSchema = BaseMemberSchema.extend({
  id: z.number().int().describe('Id of the member'),
});

export class CreateMemberDto extends createZodDto(CreateMemberSchema) {}
export class MemberDto extends createZodDto(MemberSchema) {}
