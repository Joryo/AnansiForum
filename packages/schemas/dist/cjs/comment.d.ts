import * as z from "nestjs-zod/z";
export declare const CreateComment: z.ZodObject<{
    post: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: number;
    }, {
        id?: number;
    }>;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    post?: {
        id?: number;
    };
    content?: string;
}, {
    post?: {
        id?: number;
    };
    content?: string;
}>;
export declare const UpdateComment: z.ZodObject<{
    content: z.ZodString;
}, "strict", z.ZodTypeAny, {
    content?: string;
}, {
    content?: string;
}>;
export declare const GetComments: z.ZodObject<{
    postId: z.ZodOptional<z.ZodNumber>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    order: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit?: number;
    page?: number;
    postId?: number;
    orderBy?: "createdAt";
    order?: "asc" | "desc";
    search?: string;
}, {
    limit?: number;
    page?: number;
    postId?: number;
    orderBy?: "createdAt";
    order?: "asc" | "desc";
    search?: string;
}>;
