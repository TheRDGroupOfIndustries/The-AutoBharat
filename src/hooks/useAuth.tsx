"use client";
import { SessionProvider, useSession, signOut as nextAuthSignOut, signIn as nextAuthSignIn } from "next-auth/react";
import { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  user: any | null;
  session: any | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

function AuthContextProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const user = session?.user || null;
  const isAdmin = (user as any)?.role === "admin";

  const signIn = async (email: string, password: string) => {
    const res = await nextAuthSignIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      return { error: new Error(res.error) };
    }
    return { error: null };
  };

  const signOut = async () => {
    await nextAuthSignOut({ redirect: false });
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
