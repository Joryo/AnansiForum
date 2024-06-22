import { createZodDto } from 'nestjs-zod/dto';
import { PostSchemas } from '@repo/schemas';

export class CreatePostDto extends createZodDto(PostSchemas.CreatePost) {}

export class UpdatePostDto extends createZodDto(PostSchemas.UpdatePost) {}

export class GetPostsDto extends createZodDto(PostSchemas.GetPostsDto) {}
