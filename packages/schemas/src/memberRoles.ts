export const MemberRoles = {
  ADMIN: "admin",
  MEMBER: "member",
} as const;

export type MemberRolesT = (typeof MemberRoles)[keyof typeof MemberRoles];
