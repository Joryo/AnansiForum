import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/comments";
const DEFAULT_ORDER = "createdAt";

export const getComments = async (
  postId: number,
  page: number,
  limit: number,
  orderBy?: string,
): Promise<ApiResponse> => {
  return Api.get(BASE_PATH, {
    postId,
    page,
    limit,
    orderBy: orderBy ?? DEFAULT_ORDER,
  });
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
