import {
  Controller,
  Post,
  Body,
  Req,
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
import { CommentService } from './comment.service';
import { CreateCommentDto, GetCommentsDto } from './comment.dto';
import { MemberRoles } from 'src/enums/memberRoles';
import {
  CommentGetPresenter,
  CommentCreatePresenter,
} from './comment.presenter';
import { PostService } from 'src/post/post.service';
@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly postService: PostService,
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found comments',
    type: CommentGetPresenter,
    isArray: true,
  })
  //@ApiQuery({ type: string, name: 'limit', required: false })
  async findMany(@Query() query: GetCommentsDto) {
    const params = {
      skip: query.limit * (query.page - 1),
      take: query.limit,
      orderBy: {
        [query.orderBy]: query.order,
      },
    };

    const comments = await this.commentService.comments(params);

    return comments.map((comment) => new CommentGetPresenter(comment));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created comment',
    type: CommentCreatePresenter,
  })
  async create(@Body() comment: CreateCommentDto, @Req() { user }) {
    const post = await this.postService.post({
      id: comment.post.id,
    });
    if (!post) {
      throw new NotFoundException("This post doesn't exist");
    }

    const createdComment = await this.commentService.createComment(
      comment,
      user.id,
    );

    return new CommentCreatePresenter(createdComment);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() { user }): Promise<void> {
    const comment = await this.commentService.comment({
      id: Number(id),
    });
    if (!comment) {
      throw new NotFoundException("This comment doesn't exist");
    }

    if (user.role !== MemberRoles.ADMIN && user.id !== comment.authorId) {
      throw new ForbiddenException(
        "You don't have the permission to access this comment",
      );
    }

    await this.commentService.deleteComment(id);
  }
}
