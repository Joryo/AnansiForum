import queryString from "querystring";

import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/comments";

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

export const getComment = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createComment = async (postId: number, content: string) => {
  return Api.post(BASE_PATH, { post: { id: postId }, content });
};

export const deleteComment = async (id: string) => {
  return Api.delete(`${BASE_PATH}/${id}`);
};
