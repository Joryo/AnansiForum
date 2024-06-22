import * as z from "zod";
import {PaginationSchema} from "./pagination";

export const CreateComment = z.object({
    post: z.object({
        id: z.number().int().describe('Post id of the comment'),
    }),
    content: z
        .string()
        .min(1, "Content can't be empty")
        .describe('Content of the comment'),
});

export const UpdateComment = z
    .object({
        content: z
            .string()
            .min(1, "Content can't be empty")
            .describe('Content of the comment'),
    })
    .strict();

export const GetCommentsDto = z.object({
    ...PaginationSchema.shape,
    postId: z.coerce
        .number()
        .int()
        .optional()
        .describe('Post id of the comments'),
    orderBy: z
        .enum(['createdAt'])
        .optional()
        .default('createdAt')
        .describe('Order by'),
    order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'),
    search: z.string().optional().default('').describe('Search query'),
});
