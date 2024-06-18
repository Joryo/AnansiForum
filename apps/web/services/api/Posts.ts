import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/posts";
const DEFAULT_ORDER = "createdAt";

export const getPosts = async (
  page: number,
  limit: number,
  orderBy?: string,
): Promise<ApiResponse> => {
  return Api.get(BASE_PATH, {
    page,
    limit,
    orderBy: orderBy ?? DEFAULT_ORDER,
  });
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
