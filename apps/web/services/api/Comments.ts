import queryString from "querystring";

import { z } from "zod";
import { CreateComment } from "@repo/schemas";

import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/comments";

export type CreateCommentData = z.infer<typeof CreateComment>;

export interface CommentQueryParams extends queryString.ParsedUrlQueryInput {
  page: number;
  limit: number;
  postId?: number;
  orderBy?: string;
  search?: string;
}

export const getComments = async (
  searchParams: CommentQueryParams,
): Promise<ApiResponse> => {
  return Api.get(BASE_PATH, searchParams);
};

export const createComment = async (data: CreateCommentData) => {
  return Api.post(BASE_PATH, data);
};

export const deleteComment = async (id: string) => {
  return Api.delete(`${BASE_PATH}/${id}`);
};
