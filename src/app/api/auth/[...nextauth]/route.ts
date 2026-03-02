import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.password) {
                    // Admin fallback for testing before user is added to DB
                    const adminEmail = process.env.ADMIN_EMAIL;
                    const adminPassword = process.env.ADMIN_PASSWORD;

                    if (
                        adminEmail && adminPassword &&
                        credentials.email === adminEmail &&
                        credentials.password === adminPassword
                    ) {
                        return { id: "1", email: adminEmail, name: "Admin", role: "admin" }
                    }
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }: any) {
            if (session.user) {
                session.user.role = token.role;
                session.user.id = token.sub;
            }
            return session;
        }
    },
    pages: {
        signIn: '/admin/login'
    },
    session: {
        strategy: "jwt" as const
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
