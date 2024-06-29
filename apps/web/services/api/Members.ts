import { UpdateMember } from "@repo/schemas";
import { z } from "zod";

import Api from "./Api";

const BASE_PATH = "/members";

export type UpdateMemberData = z.infer<typeof UpdateMember>;

export const updateMember = async (id: string, data: UpdateMemberData) => {
  return Api.put(`${BASE_PATH}/${id}`, data);
};
