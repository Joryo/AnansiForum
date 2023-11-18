"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetComments = exports.UpdateComment = exports.CreateComment = void 0;
const z = require("nestjs-zod/z");
const pagination_1 = require("./pagination");
exports.CreateComment = z.object({
    post: z.object({
        id: z.number().int().describe("Post id of the comment"),
    }),
    content: z
        .string()
        .min(1, "Content can't be empty")
        .describe("Content of the comment"),
});
exports.UpdateComment = z
    .object({
    content: z
        .string()
        .min(1, "Content can't be empty")
        .describe("Content of the comment"),
})
    .strict();
exports.GetComments = z.object(Object.assign(Object.assign({}, pagination_1.PaginationSchema.shape), { postId: z.coerce
        .number()
        .int()
        .optional()
        .describe("Post id of the comments"), orderBy: z
        .enum(["createdAt"])
        .optional()
        .default("createdAt")
        .describe("Order by"), order: z.enum(["asc", "desc"]).optional().default("asc").describe("Order"), search: z.string().optional().default("").describe("Search query") }));
//# sourceMappingURL=comment.js.map