import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { CommentController } from './comment/comment.controller';
import { TagController } from './tag/tag.controller';
import { TagService } from './tag/tag.service';
import { CommentService } from './comment/comment.service';
import { PostService } from './post/post.service';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [AuthModule, MemberModule],
  controllers: [
    AppController,
    PostController,
    CommentController,
    TagController,
    MemberController,
  ],
  providers: [
    AppService,
    TagService,
    CommentService,
    MemberService,
    PostService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
