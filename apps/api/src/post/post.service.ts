import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(
    where: Prisma.PostWhereUniqueInput,
    include?: Prisma.PostInclude,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where,
      include: {
        ...include,
        tags: true,
      },
    });
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        tags: true,
        author: true,
        comments: true,
      },
    });
  }

  async createPost(data: CreatePostDto, authorId: number): Promise<Post> {
    const post: Prisma.PostCreateInput = {
      ...data,
      title: data.title || '',
      author: { connect: { id: authorId } },
      tags: {
        connect: data.tags?.map((tag) => ({ id: tag.id })),
      },
    };

    return this.prisma.post.create({
      data: post,
      include: {
        tags: true,
      },
    });
  }

  async updatePost(id: string, data: UpdatePostDto): Promise<Post> {
    const post: Prisma.PostUpdateInput = {
      ...data,
      tags:
        (data.tags && {
          set: data.tags?.map((tag) => ({ id: tag.id })),
        }) ||
        undefined,
    };

    return this.prisma.post.update({
      data: post,
      where: { id: Number(id) },
      include: {
        tags: true,
      },
    });
  }

  async deletePost(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { id: Number(id) },
    });
  }
}
