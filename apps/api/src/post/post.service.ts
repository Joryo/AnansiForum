import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Post } from '@prisma/client';
import { CreatePostDto } from './entities/post';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
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
}
