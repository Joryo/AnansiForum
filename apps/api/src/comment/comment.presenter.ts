import { ApiProperty } from '@nestjs/swagger';
import { MemberGetPresenter } from '../member/member.presenter';
import { PostGetPresenter } from '../post/post.presenter';

export class CommentGetPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  author: MemberGetPresenter;
  @ApiProperty()
  post: { id: number };

  constructor(comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.author = comment.author
      ? new MemberGetPresenter(comment.author)
      : null;
    this.post = comment.post ? { id: comment.post.id } : null;
  }
}

export class CommentCreatePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  createdAt: Date;

  constructor(comment) {
    this.id = comment.id;
    this.content = comment.content;
    this.createdAt = comment.createdAt;
  }
}
