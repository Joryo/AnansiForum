import Api from "./Api";

import { ApiResponse } from "@/types";

const BASE_PATH = "/comments";
const DEFAULT_ORDERBY = "createdAt";

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
    orderBy: orderBy ?? DEFAULT_ORDERBY,
  });
};

export const getComment = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createComment = async (title: string, content: string) => {
  return Api.post(BASE_PATH, { title, content });
};
