import * as z from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod/dto';

const isHexColor = (value: string) =>
  /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

const CreateTagSchema = z.object({
  name: z.string().describe('Name of the tag'),
  color: z
    .string()
    .refine(isHexColor, {
      message: 'Color must be a valid hexadecimal color code.',
    })
    .describe('Color of the tag'),
});

const UpdateTagSchema = CreateTagSchema.extend({});

const GetTagsDtoSchema = z.object({
  limit: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('20')
    .describe('Limit of tags'),
  page: z
    .string()
    .transform((value) => parseInt(value))
    .optional()
    .default('1')
    .describe('Page of tags'),
  orderBy: z.enum(['name']).optional().default('name').describe('Order by'),
  order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'),
});

export class CreateTagDto extends createZodDto(CreateTagSchema) {}
export class UpdateTagDto extends createZodDto(UpdateTagSchema) {}
export class GetTagsDto extends createZodDto(GetTagsDtoSchema) {}
