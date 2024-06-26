import * as z from "nestjs-zod/z";
import {PaginationSchema} from "./pagination";

const isHexColor = (value: string) =>
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);

export const CreateTag = z.object({
    name: z.string().describe('Name of the tag'),
    color: z
        .string()
        .refine(isHexColor, {
            message: 'Color must be a valid hexadecimal color code.',
        })
        .describe('Color of the tag'),
});

export const UpdateTag = CreateTag.extend({});

export const GetTags = z.object({
    ...PaginationSchema.shape,
    orderBy: z.enum(['name']).optional().default('name').describe('Order by'),
    order: z.enum(['asc', 'desc']).optional().default('asc').describe('Order'),
});
