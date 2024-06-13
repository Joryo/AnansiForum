import Api from "./Api";

export const getPosts = async () => {
  return Api.get("/posts");
};
