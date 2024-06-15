import Api from "./Api";

const BASE_PATH = "/posts";
const DEFAULT_LIMIT = 20;
const DEFAULT_ORDERBY = "createdAt";

export const getPosts = async (page?: number, limit?: number, orderBy?: string) => {
  return Api.get(BASE_PATH, { page : page ?? 1, limit: limit ?? DEFAULT_LIMIT, orderBy: orderBy ?? DEFAULT_ORDERBY });
};

export const getPost = async (id: string) => {
  return Api.get(`${BASE_PATH}/${id}`);
};

export const createPost = async (title: string, content: string) => {
  return Api.post(BASE_PATH, { title, content });
};
