import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const BasePostSchema = z.object({
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  title: z.string().min(1).max(100).describe('Title of the post'),
  content: z.string().describe('Content of the post'),
});

const CreatePostSchema = BasePostSchema.extend({});

const PostSchema = BasePostSchema.extend({
  id: z.number().int().describe('Id of the post'),
  authorId: z.number().int().describe('Id of the author'),
});

export class CreatePostDto extends createZodDto(CreatePostSchema) {}
export class PostDto extends createZodDto(PostSchema) {}
