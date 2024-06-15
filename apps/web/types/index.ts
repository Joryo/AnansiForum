import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Author = {
  id: string;
  name: string;
  email: string;
};

export type Comment = {
  id: string;
  content: string;
};

export type Tag = {
  id: string;
  name: string;
};
export interface Post {
  id: string;
  title: string;
  content: string;
  author: Author;
  comments: Comment[];
  tags: Tag[];
  createdAt: string;
}
