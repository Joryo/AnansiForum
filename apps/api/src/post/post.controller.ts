import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { PostDto, CreatePostDto } from './entities/post';

@Controller('posts')
@ApiResponse({
  status: 201,
  description: 'Created Member',
  type: PostDto,
})
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiTags('Post')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 201,
    description: 'Created Member',
    type: PostDto,
  })
  async create(@Body() post: CreatePostDto, @Req() { user }): Promise<PostDto> {
    return this.postService.createPost(post, user.id);
  }
}
