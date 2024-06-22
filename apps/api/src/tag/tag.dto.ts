import { createZodDto } from 'nestjs-zod/dto';
import { TagSchemas } from '@repo/schemas';

export class CreateTagDto extends createZodDto(TagSchemas.CreateTag) {}

export class UpdateTagDto extends createZodDto(TagSchemas.UpdateTag) {}

export class GetTagsDto extends createZodDto(TagSchemas.GetTagsDto) {}
