import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

export const CommentSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z.string().nullish(),
  authorId: z.number().int(),
  postId: z.number().int(),
});

export class CommentDto extends createZodDto(CommentSchema) {}
