import Api from "./Api";
import { ApiResponse } from "@/types";

const BASE_PATH = "/posts";
const DEFAULT_ORDERBY = "createdAt";

export const getPosts = async (page: number, limit: number, orderBy?: string) : Promise<ApiResponse> => {
  return Api.get(BASE_PATH, { page, limit, orderBy: orderBy ?? DEFAULT_ORDERBY });
};

export const getPost = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createPost = async (title: string, content: string) => {
  return Api.post(BASE_PATH, { title, content });
};
