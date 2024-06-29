import queryString from "querystring";

import { z } from "zod";
import { CreatePost } from "@repo/schemas";

import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/posts";

export interface PostQueryParams extends queryString.ParsedUrlQueryInput {
  page: number;
  limit: number;
  orderBy?: string;
  search?: string;
}

export type CreatePostData = z.infer<typeof CreatePost>;

export const getPosts = async (
  queryParams: PostQueryParams,
): Promise<ApiResponse> => {
  return Api.get(BASE_PATH, queryParams);
};

export const getPost = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createPost = async (data: CreatePostData) => {
  return Api.post(BASE_PATH, data);
};

export const deletePost = async (id: string) => {
  return Api.delete(`${BASE_PATH}/${id}`);
};
