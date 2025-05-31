import { User } from "lucide-react-native";
import React from "react";
import { View } from "react-native";

import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useForm } from "react-hook-form";

import type { UserProfile } from "@/types/user";

interface WelcomeStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

export default function WelcomeStep({ data, updateData }: WelcomeStepProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const form = useForm({
    defaultValues: {
      full_name: data.full_name || "",
      nickname: data.nickname || "",
    },
  });

  const handleNameChange = (name: string) => {
    updateData({ full_name: name });
  };

  const handleNicknameChange = (nickname: string) => {
    updateData({ nickname });
  };

  return (
    <View className="flex-1 py-8">
      {/* Welcome Header */}
      <View className="items-center mb-8">
        <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4">
          <User size={48} color="#3b82f6" />
        </View>
        <H1 className="text-center mb-2">Welcome to Pro Health Coach! 👋</H1>
        <Muted className="text-center leading-6">
          Let's personalize your health journey. We'll start with some basic information about you.
        </Muted>
      </View>

      {/* Profile Form */}
      <View className="gap-6">
        <H2>Tell us about yourself</H2>

        <Form {...form}>
          <View className="gap-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect={false}
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text);
                    handleNameChange(text);
                  }}
                />
              )}
            />

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormInput
                  label="Nickname (Optional)"
                  placeholder="What should your AI coach call you?"
                  autoCapitalize="words"
                  autoComplete="nickname"
                  autoCorrect={false}
                  {...field}
                  onChangeText={(text) => {
                    field.onChange(text);
                    handleNicknameChange(text);
                  }}
                />
              )}
            />
          </View>
        </Form>

        <View className="bg-muted/50 p-4 rounded-lg">
          <Text className="text-sm text-muted-foreground">
            💡 Your AI coach will use your nickname to make conversations more personal and
            encouraging!
          </Text>
        </View>
      </View>
    </View>
  );
}
