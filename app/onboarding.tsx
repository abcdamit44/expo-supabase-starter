import BasicInfoStep from "@/app/_components/basic_info_step";
import LifestyleStep from "@/app/_components/lifestyle_step";
import NutritionStep from "@/app/_components/nutrition_step";
import PersonalizationStep from "@/app/_components/personalization_step";
import SummaryStep from "@/app/_components/summary_step";
import WelcomeStep from "@/app/_components/welcome_step";
import { SafeAreaView } from "@/components/safe-area-view";
import { useAuth } from "@/context/supabase-provider";
import { useCreateUserProfile, useUpdateUserProfile } from "@/hooks/use-health-data";
import { useColorScheme } from "@/lib/useColorScheme";
import type { UserProfile } from "@/types/user";
import { router } from "expo-router";
import { View } from "lucide-react-native";
import { useState } from "react";
import { Alert, Button, ScrollView, Text } from "react-native";

export default function OnboardingScreen() {
  const { colorScheme } = useColorScheme();
  const { session } = useAuth();
  const createProfile = useCreateUserProfile();
  const updateProfile = useUpdateUserProfile();

  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<Partial<UserProfile>>({
    user_id: session?.user?.id || "",
    full_name: session?.user?.user_metadata?.full_name || "",
    onboarding_completed: false,
    onboarding_step: 0,
    unit_system: "metric",
  });

  const steps = [
    { component: WelcomeStep, title: "Welcome" },
    { component: BasicInfoStep, title: "Basic Info" },
    { component: LifestyleStep, title: "Lifestyle" },
    { component: NutritionStep, title: "Nutrition" },
    { component: PersonalizationStep, title: "Personalization" },
    { component: SummaryStep, title: "Summary" },
  ];

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setOnboardingData((prev) => ({
        ...prev,
        onboarding_step: currentStep + 1,
      }));
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setOnboardingData((prev) => ({
        ...prev,
        onboarding_step: currentStep - 1,
      }));
    }
  };

  const handleComplete = async () => {
    try {
      const finalData = {
        ...onboardingData,
        onboarding_completed: true,
        onboarding_step: steps.length,
      };

      await createProfile.mutateAsync(
        finalData as Omit<UserProfile, "id" | "created_at" | "updated_at">
      );

      Alert.alert("Welcome to Pro Health Coach! 🚀", "Your health journey starts now!", [
        {
          text: "Let's Go!",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error) {
      console.error("Error completing onboarding:", error);
      Alert.alert("Error", "Failed to complete onboarding. Please try again.");
    }
  };

  const updateData = (newData: Partial<UserProfile>) => {
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  };

  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Progress Bar */}
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </Text>
          <Text className="text-sm font-medium">{steps[currentStep].title}</Text>
        </View>
        <View className="h-2 bg-muted rounded-full">
          <View
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </View>
      </View>

      {/* Step Content */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <CurrentStepComponent data={onboardingData} updateData={updateData} />
      </ScrollView>

      {/* Navigation Buttons */}
      <View className="px-4 pb-4 pt-2">
        <View className="flex-row justify-between gap-4">
          <View style={{ flex: 1 }}>
            <Button title="Back" onPress={handleBack} disabled={currentStep === 0} />
          </View>

          {currentStep === steps.length - 1 ? (
            <View style={{ flex: 1 }}>
              <Button
                title="Start My Journey 🚀"
                onPress={handleComplete}
                disabled={createProfile.isPending}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Button title="Next" onPress={handleNext} />
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
