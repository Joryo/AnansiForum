import { ApiProperty } from '@nestjs/swagger';

export class TagGetPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.color = tag.color;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }
}

export class TagCreatePresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  createdAt: Date;

  constructor(tag) {
    this.id = tag.id;
    this.name = tag.name;
    this.color = tag.color;
    this.createdAt = tag.createdAt;
  }
}
