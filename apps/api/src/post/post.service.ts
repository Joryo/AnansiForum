import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { SearchEngine } from '../commons/services/searchEngine';
import { SearchTables } from '../commons/enums/searchTables';

interface QueryParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.PostWhereUniqueInput;
  where?: Prisma.PostWhereInput;
  orderBy?: Prisma.PostOrderByWithRelationInput;
  search?: string;
}

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

  async posts(params: QueryParams): Promise<[number, Post[]]> {
    const { skip, take, cursor, where, orderBy } = params;
    console.log(params);
    if (params.search) {
      const searchEngine = new SearchEngine(this.prisma, SearchTables.POST);
      const foundPostIds = await searchEngine.search(params.search);
      console.log(foundPostIds);
    }
    return this.prisma.$transaction([
      this.prisma.post.count({ where }),
      this.prisma.post.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          tags: true,
          author: true,
          comments: {
            select: {
              id: true,
            },
          },
        },
      }),
    ]);
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
