import "../global.css";

import { Stack } from "expo-router";

import { colors } from "@/constants/colors";
import { QueryProvider } from "@/context/query-provider";
import { AuthProvider } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";

export default function AppLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <QueryProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <Stack.Screen name="(protected)" />
          <Stack.Screen name="welcome" />
          <Stack.Screen
            name="sign-up"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Sign Up",
              headerStyle: {
                backgroundColor:
                  colorScheme === "dark" ? colors.dark.background : colors.light.background,
              },
              headerTintColor:
                colorScheme === "dark" ? colors.dark.foreground : colors.light.foreground,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="sign-in"
            options={{
              presentation: "modal",
              headerShown: true,
              headerTitle: "Sign In",
              headerStyle: {
                backgroundColor:
                  colorScheme === "dark" ? colors.dark.background : colors.light.background,
              },
              headerTintColor:
                colorScheme === "dark" ? colors.dark.foreground : colors.light.foreground,
              gestureEnabled: true,
            }}
          />
        </Stack>
      </AuthProvider>
    </QueryProvider>
  );
}
