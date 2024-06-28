import * as z from "nestjs-zod/z";
import {MemberRoles} from "./memberRoles";

export const BaseMemberSchema = z.object({
    email: z.string().email().describe('Email of the member'),
    name: z.string().describe('Name of the member'),
    password: z.string().min(8).max(100).describe('Password of the member'),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});

export const CreateMember = BaseMemberSchema.extend({
    role: z
        .nativeEnum(MemberRoles)
        .optional()
        .default(MemberRoles.MEMBER)
        .describe('Role of the member'),
});

export const UpdateMember = z.object({
    name: z.string().min(3).optional().describe('Name of the member'),
    email: z.string().email().optional().describe('Email of the member'),
    password: z
        .string()
        .min(8)
        .max(100)
        .optional()
        .describe('Password of the member'),
    role: z.nativeEnum(MemberRoles).optional().describe('Role of the member'),
});

export const Member = CreateMember.extend({
    id: z.number().int().describe('Id of the member'),
});
