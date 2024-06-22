import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { PaginationSchema } from '../commons/schemas/pagination';

const CreateCommentSchema = z.object({
  post: z.object({
    id: z.number().int().describe('Post id of the comment'),
  }),
  content: z
    .string()
    .min(1, "Content can't be empty")
    .describe('Content of the comment'),
});

const UpdateCommentSchema = z
  .object({
    content: z
      .string()
      .min(1, "Content can't be empty")
      .describe('Content of the comment'),
  })
  .strict();

const GetCommentsDtoSchema = z.object({
  ...PaginationSchema.shape,
  postId: z.coerce
    .number()
    .int()
    .optional()
    .describe('Post id of the comments'),
  orderBy: z
    .enum(['createdAt'])
    .optional()
    .default('createdAt')
    .describe('Order by'),
  order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'),
  search: z.string().optional().default('').describe('Search query'),
});

export class CreateCommentDto extends createZodDto(CreateCommentSchema) {}

export class UpdateCommentDto extends createZodDto(UpdateCommentSchema) {}

export class GetCommentsDto extends createZodDto(GetCommentsDtoSchema) {}
