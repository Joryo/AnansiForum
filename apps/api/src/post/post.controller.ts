import {
  Controller,
  Post,
  Body,
  Req,
  Put,
  UseGuards,
  Delete,
  Param,
  Get,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto, GetPostsDto, UpdatePostDto } from './post.dto';
import { MemberRoles } from 'src/enums/memberRoles';
import { PostGetPresenter, PostCreatePresenter } from './post.presenter';

@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found post',
    type: PostGetPresenter,
  })
  async findOne(@Param('id') id: string) {
    const post = await this.postService.post(
      {
        id: Number(id),
      },
      { author: true },
    );

    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }

    return new PostGetPresenter(post);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found posts',
    type: PostGetPresenter,
    isArray: true,
  })
  //@ApiQuery({ type: string, name: 'limit', required: false })
  async findMany(@Query() query: GetPostsDto) {
    const params = {
      skip: query.limit * (query.page - 1),
      take: query.limit,
      orderBy: {
        [query.orderBy]: query.order,
      },
    };

    const posts = await this.postService.posts(params);
    console.log(posts)

    return posts.map((post) => new PostGetPresenter(post));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created post',
    type: PostCreatePresenter,
  })
  async create(@Body() post: CreatePostDto, @Req() { user }) {
    const createdPost = await this.postService.createPost(post, user.id);

    return new PostCreatePresenter(createdPost);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update post',
    type: PostCreatePresenter,
  })
  async update(
    @Param('id') id: string,
    @Body() post: UpdatePostDto,
    @Req() { user },
  ) {
    const currentPost = await this.postService.post({
      id: Number(id),
    });
    if (!currentPost) {
      throw new NotFoundException("This post doesn't exist");
    }
    if (user.role !== MemberRoles.ADMIN && user.id !== currentPost.authorId) {
      throw new ForbiddenException(
        "You don't have the permission to update this post",
      );
    }
    const updatedPost = await this.postService.updatePost(id, post);

    return new PostCreatePresenter(updatedPost);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() { user }): Promise<void> {
    const post = await this.postService.post({
      id: Number(id),
    });
    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }
    if (user.role !== MemberRoles.ADMIN && user.id !== post.authorId) {
      throw new ForbiddenException(
        "You don't have the permission to delete this post",
      );
    }

    await this.postService.deletePost(id);
  }
}
