import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { Post } from 'src/post/entities/post';

export const TagSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  name: z.string(),
  color: z.string(),
});

export class TagDto extends createZodDto(TagSchema) {}

export interface Tag extends z.infer<typeof TagSchema> {
  posts: Post[];
}
