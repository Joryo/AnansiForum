import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

export const PostSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  content: z.string().nullish(),
  authorId: z.number().int(),
});

export class PostDto extends createZodDto(PostSchema) {}
