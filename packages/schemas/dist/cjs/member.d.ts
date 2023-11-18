import * as z from "nestjs-zod/z";
export declare const BaseMemberSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
}, {
    email?: string;
    name?: string;
    password?: string;
}>;
export declare const CreateMember: z.ZodObject<z.objectUtil.extendShape<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, {
    role: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly MEMBER: "member";
    }>>>;
}>, "strip", z.ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}, {
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}>;
export declare const UpdateMember: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly MEMBER: "member";
    }>>;
}, "strip", z.ZodTypeAny, {
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}, {
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}>;
export declare const Member: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
}, {
    role: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly MEMBER: "member";
    }>>>;
}>, {
    id: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}, {
    id?: number;
    email?: string;
    name?: string;
    password?: string;
    role?: "admin" | "member";
}>;
