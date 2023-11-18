import * as z from "nestjs-zod/z";
export declare const CreatePost: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    tags: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: number;
    }, {
        id?: number;
    }>, "many">>>;
}, "strip", z.ZodTypeAny, {
    content?: string;
    title?: string;
    tags?: {
        id?: number;
    }[];
}, {
    content?: string;
    title?: string;
    tags?: {
        id?: number;
    }[];
}>;
export declare const UpdatePost: z.ZodObject<{
    content: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id?: number;
    }, {
        id?: number;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    content?: string;
    tags?: {
        id?: number;
    }[];
}, {
    content?: string;
    tags?: {
        id?: number;
    }[];
}>;
export declare const GetPosts: z.ZodObject<{
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["createdAt"]>>>;
    order: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    search: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit?: number;
    page?: number;
    orderBy?: "createdAt";
    order?: "asc" | "desc";
    search?: string;
}, {
    limit?: number;
    page?: number;
    orderBy?: "createdAt";
    order?: "asc" | "desc";
    search?: string;
}>;
