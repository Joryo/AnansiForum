import * as z from "nestjs-zod/z";

export const PaginationSchema = z.object({
    limit: z.coerce
        .number()
        .int()
        .gt(0, 'Limit must be greater than 0')
        .optional()
        .default(20)
        .describe('Limit of items'),
    page: z.coerce
        .number()
        .int()
        .gt(0, 'Page must be greater than 0')
        .optional()
        .default(1)
        .describe('Page of items'),
});
