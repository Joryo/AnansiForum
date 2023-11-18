import * as z from "nestjs-zod/z";
export declare const PaginationSchema: z.ZodObject<{
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit?: number;
    page?: number;
}, {
    limit?: number;
    page?: number;
}>;
