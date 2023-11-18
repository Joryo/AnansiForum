import {
  Controller,
  Post,
  Body,
  Req,
  Put,
  UseGuards,
  Delete,
  Param,
  Get,
  ForbiddenException,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagService } from './tag.service';
import { CreateTagDto, GetTagsDto, UpdateTagDto } from './tag.dto';
import { MemberRoles } from '@repo/schemas';
import { TagGetPresenter, TagCreatePresenter } from './tag.presenter';

@ApiTags('Tag')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found comments',
    type: TagGetPresenter,
    isArray: true,
  })
  //@ApiQuery({ type: string, name: 'limit', required: false })
  async findMany(@Query() query: GetTagsDto) {
    const params = {
      skip: query.page ? query.limit * (query.page - 1) : 0,
      take: query.limit,
      orderBy: {
        [query.orderBy]: query.order,
      },
    };

    const tags = await this.tagService.tags(params);

    return tags.map((tag) => new TagGetPresenter(tag));
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Created tag',
    type: TagCreatePresenter,
  })
  async create(@Body() tag: CreateTagDto, @Req() { user }) {
    if (user.role !== MemberRoles.ADMIN) {
      throw new ForbiddenException(
        "You don't have the permission to create tag",
      );
    }
    const createdTag = await this.tagService.createTag(tag);

    return new TagCreatePresenter(createdTag);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update tag',
    type: TagCreatePresenter,
  })
  async update(
    @Param('id') id: string,
    @Body() post: UpdateTagDto,
    @Req() { user },
  ) {
    if (user.role !== MemberRoles.ADMIN) {
      throw new ForbiddenException(
        "You don't have the permission to update tags",
      );
    }

    const currentPost = await this.tagService.tag({
      id: Number(id),
    });
    if (!currentPost) {
      throw new NotFoundException("This tag doesn't exist");
    }

    const updatedPost = await this.tagService.updateTag(id, post);

    return new TagCreatePresenter(updatedPost);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
  })
  @HttpCode(204)
  async delete(@Param('id') id: string, @Req() { user }): Promise<void> {
    const tag = await this.tagService.tag({
      id: Number(id),
    });
    if (!tag) {
      throw new NotFoundException("This tag doesn't exist");
    }

    if (user.role !== MemberRoles.ADMIN) {
      throw new ForbiddenException(
        "You don't have the permission to delete tag",
      );
    }

    await this.tagService.deleteTag(id);
  }
}
