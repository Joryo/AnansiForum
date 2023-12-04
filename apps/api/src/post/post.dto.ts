import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const CreatePostSchema = z.object({
  title: z.string().describe('Title of the post'),
  content: z.string().describe('Content of the post'),
});

const GetPostsDtoSchema = z.object({
  limit: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('20')
    .describe('Limit of posts'),
  page: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('1')
    .describe('Page of posts'),
  orderBy: z
    .enum(['createdAt'])
    .optional()
    .default('createdAt')
    .describe('Order by'),
  order: z.enum(['asc', 'desc']).optional().default('desc').describe('Order'),
});

export class CreatePostDto extends createZodDto(CreatePostSchema) {}
export class GetPostsDto extends createZodDto(GetPostsDtoSchema) {}
