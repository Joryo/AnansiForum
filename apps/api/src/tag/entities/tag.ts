import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

export const TagSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  color: z.string(),
});

export class TagDto extends createZodDto(TagSchema) {}
