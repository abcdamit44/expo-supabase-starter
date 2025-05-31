import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/context/supabase-provider";
import { useUserProfile } from "@/hooks/use-health-data";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function ProtectedLayout() {
  const { initialized, session } = useAuth();
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();

  if (!initialized || profileLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/welcome" />;
  }

  // If user exists but hasn't completed onboarding, redirect to onboarding
  if (session && (!userProfile || !userProfile.onboarding_completed)) {
    return <Redirect href="/(protected)/onboarding" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="onboarding" options={{ presentation: "modal" }} />
    </Stack>
  );
}
