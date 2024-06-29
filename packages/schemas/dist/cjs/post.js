"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPosts = exports.UpdatePost = exports.CreatePost = void 0;
const z = require("nestjs-zod/z");
const pagination_1 = require("./pagination");
const MIN_CONTENT_LENGTH = 10;
exports.CreatePost = z.object({
    title: z
        .string()
        .min(1, "Title can't be empty")
        .describe('Title of the post'),
    content: z
        .string()
        .min(MIN_CONTENT_LENGTH, 'Content has minimum size of 10 characters')
        .describe('Content of the post'),
    tags: z
        .array(z.object({ id: z.number().int() }))
        .optional()
        .default([]),
});
exports.UpdatePost = z
    .object({
    content: z
        .string()
        .min(MIN_CONTENT_LENGTH, 'Content has minimum size of 10 characters')
        .optional()
        .describe('Content of the post'),
    tags: z.array(z.object({ id: z.number().int() })).optional(),
})
    .strict();
exports.GetPosts = z.object(Object.assign(Object.assign({}, pagination_1.PaginationSchema.shape), { orderBy: z
        .enum(['createdAt'])
        .optional()
        .default('createdAt')
        .describe('Order by'), order: z.enum(['asc', 'desc']).optional().default('desc').describe('Order'), search: z.string().optional().default('').describe('Search') }));
//# sourceMappingURL=post.js.map