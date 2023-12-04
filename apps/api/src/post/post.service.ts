import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';
import { CreatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(
    where: Prisma.PostWhereUniqueInput,
    include?: Prisma.PostInclude,
  ): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where,
      include,
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
    console.log('orderBy', orderBy);
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: CreatePostDto, authorId: number): Promise<Post> {
    const post: Prisma.PostCreateInput = {
      ...data,
      title: data.title || '',
      author: { connect: { id: authorId } },
    };

    return this.prisma.post.create({
      data: post,
    });
  }

  async deletePost(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: { id: Number(id) },
    });
  }
}
