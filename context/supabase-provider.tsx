import { SplashScreen, useRouter } from "expo-router";
import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/config/supabase";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  initialized: boolean;
  session: Session | null;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthState>({
  initialized: false,
  session: null,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: PropsWithChildren) {
  const [initialized, setInitialized] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      console.log("Attempting to sign up with Supabase...");
      console.log("Supabase URL:", process.env.EXPO_PUBLIC_SUPABASE_URL);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: name
          ? {
              data: {
                full_name: name,
              },
            }
          : undefined,
      });

      if (error) {
        console.error("Error signing up:", error);
        console.error("Error details:", {
          message: error.message,
          status: error.status,
        });
        throw error;
      }

      if (data.session) {
        setSession(data.session);
        console.log("User signed up successfully:", data.user);
      } else {
        console.log("Sign up successful, but email confirmation may be required");
      }
    } catch (error) {
      console.error("Network or unexpected error during sign up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in:", error);
      return;
    }

    if (data.session) {
      setSession(data.session);
      console.log("User signed in:", data.user);
    } else {
      console.log("No user returned from sign in");
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out:", error);
      return;
    }
    console.log("User signed out");
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      SplashScreen.hideAsync();
      if (session) {
        router.replace("/");
      } else {
        router.replace("/welcome");
      }
    }
    // eslint-disable-next-line
  }, [initialized, session]);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        session,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
