"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPosts = exports.UpdatePost = exports.CreatePost = void 0;
var z = require("nestjs-zod/z");
var pagination_1 = require("./pagination");
var MIN_CONTENT_LENGTH = 10;
exports.CreatePost = z.object({
    title: z
        .string()
        .min(1, "Title can't be empty")
        .describe('Title of the post'),
    content: z
        .string()
        .min(MIN_CONTENT_LENGTH, 'Content has minimum size')
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
        .min(MIN_CONTENT_LENGTH, 'Content has minimum size')
        .optional()
        .describe('Content of the post'),
    tags: z.array(z.object({ id: z.number().int() })).optional(),
})
    .strict();
exports.GetPosts = z.object(__assign(__assign({}, pagination_1.PaginationSchema.shape), { orderBy: z
        .enum(['createdAt'])
        .optional()
        .default('createdAt')
        .describe('Order by'), order: z.enum(['asc', 'desc']).optional().default('desc').describe('Order'), search: z.string().optional().default('').describe('Search') }));
