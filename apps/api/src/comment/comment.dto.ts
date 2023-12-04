import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const CreateCommentSchema = z.object({
  post: z.object({
    id: z.number().int().describe('Post id of the comment'),
  }),
  content: z.string().describe('Content of the comment'),
});

const GetCommentsDtoSchema = z.object({
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
});

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}
export class GetCommentsDto extends createZodDto(GetCommentsDtoSchema) {}
