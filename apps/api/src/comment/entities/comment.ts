import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { Post } from 'src/post/entities/post';
import { Member } from 'src/member/entities/member';

export const CommentSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  content: z.string().nullish(),
  authorId: z.number().int(),
  postId: z.number().int(),
});

export class CommentDto extends createZodDto(CommentSchema) {}

export interface Comment extends z.infer<typeof CommentSchema> {
  post: Post;
  author: Member[];
}
