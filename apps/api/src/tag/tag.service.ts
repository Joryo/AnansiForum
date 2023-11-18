import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Tag } from '@prisma/client';
import { CreateTagDto, UpdateTagDto } from './tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async tag(
    where: Prisma.TagWhereUniqueInput,
    include?: Prisma.TagInclude,
  ): Promise<Tag | null> {
    return this.prisma.tag.findUnique({
      where,
      include,
    });
  }

  async tags(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TagWhereUniqueInput;
    where?: Prisma.TagWhereInput;
    orderBy?: Prisma.TagOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.tag.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTag(data: CreateTagDto): Promise<Tag> {
    const tag: Prisma.TagCreateInput = {
      ...data,
      name: data.name || '',
      color: data.color || '#000000',
    };

    return this.prisma.tag.create({
      data: tag,
    });
  }

  async updateTag(id: string, data: UpdateTagDto): Promise<Tag> {
    const post: Prisma.TagUpdateInput = {
      ...data,
    };

    return this.prisma.tag.update({
      data: post,
      where: { id: Number(id) },
    });
  }

  async deleteTag(id: string): Promise<Tag> {
    return this.prisma.tag.delete({
      where: { id: Number(id) },
    });
  }
}
