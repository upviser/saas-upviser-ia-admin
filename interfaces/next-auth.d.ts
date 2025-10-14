import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name?: string;
      email: string;
      type: string
      permissions?: string[]
      plan: string
    };
    tenantId: string;
  }

  interface User {
    _id: string;
    email: string;
    tenantId: string;
    type: string;
    permissions?: string[];
    plan: string;
  }
}