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
exports.GetComments = exports.UpdateComment = exports.CreateComment = void 0;
var z = require("nestjs-zod/z");
var pagination_1 = require("./pagination");
exports.CreateComment = z.object({
    post: z.object({
        id: z.number().int().describe('Post id of the comment'),
    }),
    content: z
        .string()
        .min(1, "Content can't be empty")
        .describe('Content of the comment'),
});
exports.UpdateComment = z
    .object({
    content: z
        .string()
        .min(1, "Content can't be empty")
        .describe('Content of the comment'),
})
    .strict();
exports.GetComments = z.object(__assign(__assign({}, pagination_1.PaginationSchema.shape), { postId: z.coerce
        .number()
        .int()
        .optional()
        .describe('Post id of the comments'), orderBy: z
        .enum(['createdAt'])
        .optional()
        .default('createdAt')
        .describe('Order by'), order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'), search: z.string().optional().default('').describe('Search query') }));
