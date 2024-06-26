"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = exports.UpdateMember = exports.CreateMember = exports.BaseMemberSchema = void 0;
const z = require("nestjs-zod/z");
const memberRoles_1 = require("./memberRoles");
exports.BaseMemberSchema = z.object({
    email: z.string().email().describe('Email of the member'),
    name: z.string().describe('Name of the member'),
    password: z.string().min(8).max(100).describe('Password of the member'),
    createdAt: z.date().default(() => new Date()),
    updatedAt: z.date().default(() => new Date()),
});
exports.CreateMember = exports.BaseMemberSchema.extend({
    role: z
        .nativeEnum(memberRoles_1.MemberRoles)
        .optional()
        .default(memberRoles_1.MemberRoles.MEMBER)
        .describe('Role of the member'),
});
exports.UpdateMember = z.object({
    name: z.string().optional().describe('Name of the member'),
    email: z.string().email().optional().describe('Email of the member'),
    password: z
        .string()
        .min(8)
        .max(100)
        .optional()
        .describe('Password of the member'),
    role: z.nativeEnum(memberRoles_1.MemberRoles).optional().describe('Role of the member'),
});
exports.Member = exports.CreateMember.extend({
    id: z.number().int().describe('Id of the member'),
});
//# sourceMappingURL=member.js.map