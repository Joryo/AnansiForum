import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { Comment } from 'src/comment/entities/comment';
import { Post } from 'src/post/entities/post';

export const MemberSchema = z.object({
  email: z.string().describe('Email of the member'),
  name: z.string(),
  role: z.string(),
  password: z.string(),
});

export class MemberDto extends createZodDto(MemberSchema) {}

export interface Member extends z.infer<typeof MemberSchema> {
  posts: Post[];
  comments: Comment[];
}
