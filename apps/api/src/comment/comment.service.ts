import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Comment } from '@prisma/client';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { SearchEngine } from '../commons/services/searchEngine';

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
    search?: string;
    orderBy?: Prisma.CommentOrderByWithRelationInput;
  }): Promise<[number, Comment[]]> {
    const { skip, take, cursor, where, orderBy } = params;
    if (params.search) {
      const searchEngine = new SearchEngine(this.prisma);
      const foundCommentIds = await searchEngine.searchComments(params.search);
      where.id = { in: foundCommentIds };
    }

    return this.prisma.$transaction([
      this.prisma.comment.count({ where }),
      this.prisma.comment.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          author: true,
          post: {
            select: {
              id: true,
            },
          },
        },
      }),
    ]);
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

  async updateComment(id: string, data: UpdateCommentDto): Promise<Comment> {
    const comment: Prisma.CommentUpdateInput = {
      ...data,
    };

    return this.prisma.comment.update({
      data: comment,
      where: { id: Number(id) },
    });
  }

  async deleteComment(id: string): Promise<Comment> {
    return this.prisma.comment.delete({
      where: { id: Number(id) },
    });
  }
}
