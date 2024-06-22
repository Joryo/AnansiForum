import queryString from "querystring";

import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/posts";

export interface PostQueryParams extends queryString.ParsedUrlQueryInput {
  page: number;
  limit: number;
  orderBy?: string;
  search?: string;
}

export const getPosts = async (
  queryParams: PostQueryParams,
): Promise<ApiResponse> => {
  return Api.get(BASE_PATH, queryParams);
};

export const getPost = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createPost = async (title: string, content: string) => {
  return Api.post(BASE_PATH, { title, content });
};

export const deletePost = async (id: string) => {
  return Api.delete(`${BASE_PATH}/${id}`);
};
