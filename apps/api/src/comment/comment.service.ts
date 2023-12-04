import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Comment } from '@prisma/client';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async comment(
    where: Prisma.CommentWhereUniqueInput,
    include?: Prisma.CommentInclude,
  ): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where,
      include,
    });
  }

  async comments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CommentWhereUniqueInput;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<Comment[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createComment(
    data: CreateCommentDto,
    authorId: number,
  ): Promise<Comment> {
    const comment: Prisma.CommentCreateInput = {
      ...data,
      author: { connect: { id: authorId } },
      post: { connect: { id: data.post.id } },
    };

    return this.prisma.comment.create({
      data: comment,
    });
  }

  async deleteComment(id: string): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id: Number(id) },
    });
  }
}
