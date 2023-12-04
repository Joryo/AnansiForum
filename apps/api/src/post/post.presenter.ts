import { ApiProperty } from '@nestjs/swagger';
import { MemberGetPresenter } from '../member/member.presenter';
import { TagGetPresenter } from '../tag/tag.presenter';

export class PostGetPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  author: MemberGetPresenter;
  @ApiProperty()
  tags: TagGetPresenter[];

  constructor(post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.author = post.author ? new MemberGetPresenter(post.author) : null;
    this.tags = post.tags
      ? post.tags.map((tag) => new TagGetPresenter(tag))
      : [];
  }
}

export class PostCreatePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  tags: TagGetPresenter[];

  constructor(post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.tags = post.tags
      ? post.tags.map((tag) => new TagGetPresenter(tag))
      : [];
  }
}
