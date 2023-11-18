import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const LoginSchema = z.object({
  username: z
    .string()
    .email()
    .default('admin@anansi.com')
    .describe('Email of the member'),
  password: z
    .string()
    .min(8)
    .max(100)
    .default('admin.m2p')
    .describe('Password of the member'),
});

export class LoginDto extends createZodDto(LoginSchema) {}
