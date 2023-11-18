import { UpdateMember, CreateMember } from "@repo/schemas";
import { z } from "zod";

import Api from "./Api";

const BASE_PATH = "/members";

export type CreateMemberData = z.infer<typeof CreateMember>;
export type UpdateMemberData = z.infer<typeof UpdateMember>;

export const updateMember = async (id: string, data: UpdateMemberData) => {
  return Api.put(`${BASE_PATH}/${id}`, data);
};

export const createMember = async (data: CreateMemberData) => {
  return Api.post(BASE_PATH, data);
};
