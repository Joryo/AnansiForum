import { createZodDto } from 'nestjs-zod/dto';
import { CreateTag, UpdateTag, GetTags } from '@repo/schemas';

export class CreateTagDto extends createZodDto(CreateTag) {}

export class UpdateTagDto extends createZodDto(UpdateTag) {}

export class GetTagsDto extends createZodDto(GetTags) {}
