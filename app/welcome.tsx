import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import { Logo } from "@/components/logo";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Lead } from "@/components/ui/typography";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex flex-1 bg-background p-4">
      <View className="flex flex-1 items-center justify-center gap-y-4 web:m-4">
        <Logo size={80} />
        <H1 className="text-center">Welcome to Pro Health Coach</H1>
        <Lead className="text-center">
          Your AI-powered fitness and wellness companion. Get personalized workout plans, nutrition
          guidance, and smart health coaching tailored just for you.
        </Lead>
      </View>
      <View className="flex flex-col gap-y-4 web:m-4">
        <Button
          size="default"
          variant="default"
          onPress={() => {
            router.push("/sign-up");
          }}
        >
          <Text>Sign Up</Text>
        </Button>
        <Button
          size="default"
          variant="secondary"
          onPress={() => {
            router.push("/sign-in");
          }}
        >
          <Text>Sign In</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
