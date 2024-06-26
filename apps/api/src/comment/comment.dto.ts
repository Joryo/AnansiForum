import { createZodDto } from 'nestjs-zod/dto';
import { CreateComment, UpdateComment, GetComments } from '@repo/schemas';

export class CreateCommentDto extends createZodDto(CreateComment) {}

export class UpdateCommentDto extends createZodDto(UpdateComment) {}

export class GetCommentsDto extends createZodDto(GetComments) {}
