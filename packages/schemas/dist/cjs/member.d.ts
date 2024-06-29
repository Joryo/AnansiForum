import * as z from "nestjs-zod/z";
export declare const BaseMemberSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
}, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}>;
export declare const CreateMember: z.ZodObject<z.objectUtil.extendShape<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
}, {
    role: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly MEMBER: "member";
    }>>>;
}>, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: "admin" | "member";
}, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
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
    name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "member";
}, {
    name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "member";
}>;
export declare const Member: z.ZodObject<z.objectUtil.extendShape<z.objectUtil.extendShape<{
    email: z.ZodString;
    name: z.ZodString;
    password: z.ZodString;
    createdAt: z.ZodDefault<z.ZodDate>;
    updatedAt: z.ZodDefault<z.ZodDate>;
}, {
    role: z.ZodDefault<z.ZodOptional<z.ZodNativeEnum<{
        readonly ADMIN: "admin";
        readonly MEMBER: "member";
    }>>>;
}>, {
    id: z.ZodNumber;
}>, "strip", z.ZodTypeAny, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: "admin" | "member";
    id?: number;
}, {
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    role?: "admin" | "member";
    id?: number;
}>;
