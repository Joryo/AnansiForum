import {
  Controller,
  Post,
  Body,
  Put,
  Req,
  UseGuards,
  Delete,
  Param,
  Get,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  Query,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  GetCommentsDto,
  UpdateCommentDto,
} from './comment.dto';
import { MemberRoles } from 'src/enums/memberRoles';
import {
  CommentGetPresenter,
  CommentCreatePresenter,
} from './comment.presenter';
import { PostService } from 'src/post/post.service';
import { Response } from 'express';

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
  @ApiHeader({
    name: 'X-Total-Count',
    description: 'The total number of comments for the current query',
  })
  //@ApiQuery({ type: string, name: 'limit', required: false })
  async findMany(
    @Query() query: GetCommentsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const params = {
      skip: query.limit * (query.page - 1),
      take: query.limit,
      orderBy: {
        [query.orderBy]: query.order,
      },
      where: {
        postId: query.postId,
      },
    };

    const [count, comments] = await this.commentService.comments(params);

    res.header('X-Total-Count', count.toString());

    return comments.map((comment) => new CommentGetPresenter(comment));
  }

  @Post()
  @ApiResponse({
    status: 200,
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

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Update comment',
    type: CommentCreatePresenter,
  })
  async update(
    @Param('id') id: string,
    @Body() comment: UpdateCommentDto,
    @Req() { user },
  ) {
    const currentComment = await this.commentService.comment({
      id: Number(id),
    });
    if (!currentComment) {
      throw new NotFoundException("This comment doesn't exist");
    }
    if (
      user.role !== MemberRoles.ADMIN &&
      user.id !== currentComment.authorId
    ) {
      throw new ForbiddenException(
        "You don't have the permission to update this comment",
      );
    }
    const updatedComment = await this.commentService.updateComment(id, comment);

    return new CommentCreatePresenter(updatedComment);
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
