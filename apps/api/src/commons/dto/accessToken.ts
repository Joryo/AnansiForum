import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const AccessTokenSchema = z.object({
  access_token: z.string().describe('Bearer token'),
});

export class AccessTokenDto extends createZodDto(AccessTokenSchema) {}
