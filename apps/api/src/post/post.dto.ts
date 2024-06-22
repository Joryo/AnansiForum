import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';
import { PaginationSchema } from '../commons/schemas/pagination';

const MIN_CONTENT_LENGTH = 10;

const CreatePostSchema = z.object({
  title: z
    .string()
    .min(1, "Title can't be empty")
    .describe('Title of the post'),
  content: z
    .string()
    .min(MIN_CONTENT_LENGTH, 'Content has minimum size')
    .describe('Content of the post'),
  tags: z
    .array(z.object({ id: z.number().int() }))
    .optional()
    .default([]),
});

const UpdatePostSchema = z
  .object({
    content: z
      .string()
      .min(MIN_CONTENT_LENGTH, 'Content has minimum size')
      .optional()
      .describe('Content of the post'),
    tags: z.array(z.object({ id: z.number().int() })).optional(),
  })
  .strict();

const GetPostsDtoSchema = z.object({
  ...PaginationSchema.shape,
  orderBy: z
    .enum(['createdAt'])
    .optional()
    .default('createdAt')
    .describe('Order by'),
  order: z.enum(['asc', 'desc']).optional().default('desc').describe('Order'),
  search: z.string().optional().default('').describe('Search'),
});

export class CreatePostDto extends createZodDto(CreatePostSchema) {}

export class UpdatePostDto extends createZodDto(UpdatePostSchema) {}

export class GetPostsDto extends createZodDto(GetPostsDtoSchema) {}
