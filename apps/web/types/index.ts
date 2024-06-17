import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  comments: Comment[];
  tags: Tag[];
  createdAt: string;
}

export interface ApiResponse {
  data: any;
  totalCount: number;
}
