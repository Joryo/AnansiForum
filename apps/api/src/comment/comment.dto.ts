import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const CreateCommentSchema = z.object({
  post: z.object({
    id: z.number().int().describe('Post id of the comment'),
  }),
  content: z.string().describe('Content of the comment'),
});

const UpdateCommentSchema = z
  .object({
    content: z.string().optional().describe('Content of the comment'),
  })
  .strict();

const GetCommentsDtoSchema = z.object({
  postId: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .describe('Post id of the comments'),
  limit: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('20')
    .describe('Limit of comments'),
  page: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('1')
    .describe('Page of comments'),
  orderBy: z
    .enum(['createdAt'])
    .optional()
    .default('createdAt')
    .describe('Order by'),
  order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'),
  search: z.string().optional().default('').describe('Search'),
});

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}

export class UpdateCommentDto extends createZodDto(UpdateCommentSchema) {}

export class GetCommentsDto extends createZodDto(GetCommentsDtoSchema) {}
