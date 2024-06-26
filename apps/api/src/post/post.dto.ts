import { createZodDto } from 'nestjs-zod/dto';
import { CreatePost, UpdatePost, GetPosts } from '@repo/schemas';

export class CreatePostDto extends createZodDto(CreatePost) {}

export class UpdatePostDto extends createZodDto(UpdatePost) {}

export class GetPostsDto extends createZodDto(GetPosts) {}
