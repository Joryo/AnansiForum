import { ApiProperty } from '@nestjs/swagger';
import { MemberGetPresenter } from '../member/member.presenter';

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

  constructor(post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
    this.updatedAt = post.updatedAt;
    this.author = post.author ? new MemberGetPresenter(post.author) : null;
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

  constructor(post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;
  }
}
