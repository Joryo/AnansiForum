import { createZodDto } from 'nestjs-zod/dto';
import { CommentSchemas } from '@repo/schemas';

export class CreateCommentDto extends createZodDto(
  CommentSchemas.CreateComment,
) {}

export class UpdateCommentDto extends createZodDto(
  CommentSchemas.UpdateComment,
) {}

export class GetCommentsDto extends createZodDto(
  CommentSchemas.GetCommentsDto,
) {}
