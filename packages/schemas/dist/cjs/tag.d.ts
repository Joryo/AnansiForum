import * as z from "nestjs-zod/z";
export declare const CreateTag: z.ZodObject<{
    name: z.ZodString;
    color: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    color?: string;
}, {
    name?: string;
    color?: string;
}>;
export declare const UpdateTag: z.ZodObject<z.objectUtil.extendShape<{
    name: z.ZodString;
    color: z.ZodEffects<z.ZodString, string, string>;
}, {}>, "strip", z.ZodTypeAny, {
    name?: string;
    color?: string;
}, {
    name?: string;
    color?: string;
}>;
export declare const GetTags: z.ZodObject<{
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<["name"]>>>;
    order: z.ZodDefault<z.ZodOptional<z.ZodEnum<["asc", "desc"]>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    page: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    limit?: number;
    page?: number;
    orderBy?: "name";
    order?: "asc" | "desc";
}, {
    limit?: number;
    page?: number;
    orderBy?: "name";
    order?: "asc" | "desc";
}>;
