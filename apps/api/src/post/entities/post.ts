import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { Comment } from 'src/comment/entities/comment';
import { Tag } from 'src/tag/entities/tag';
import { Member } from 'src/member/entities/member';

export const PostSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  content: z.string().nullish(),
  authorId: z.number().int(),
});

export class PostDto extends createZodDto(PostSchema) {}

export interface Post extends z.infer<typeof PostSchema> {
  author: Member;
  tags: Tag[];
  comments: Comment[];
}
