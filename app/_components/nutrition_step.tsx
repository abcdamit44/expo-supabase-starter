import { Fish, Leaf, Pill, Wheat } from "lucide-react-native";
import type React from "react";
import { Pressable, View } from "react-native";

import { FormField, FormInput } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { H1, H2, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";
import { useForm } from "react-hook-form";

import type { DietType, UserProfile } from "@/types/user";

interface NutritionStepProps {
  data: Partial<UserProfile>;
  updateData: (data: Partial<UserProfile>) => void;
}

const dietTypeOptions: {
  value: DietType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "vegetarian",
    label: "Vegetarian",
    description: "No meat, but includes dairy and eggs",
    icon: <Leaf size={24} color="#10b981" />,
  },
  {
    value: "vegan",
    label: "Vegan",
    description: "No animal products at all",
    icon: <Leaf size={24} color="#059669" />,
  },
  {
    value: "keto",
    label: "Keto",
    description: "High-fat, low-carb diet",
    icon: <Fish size={24} color="#f59e0b" />,
  },
  {
    value: "high-protein",
    label: "High-Protein",
    description: "Protein-focused diet",
    icon: <Wheat size={24} color="#ef4444" />,
  },
  {
    value: "no-preference",
    label: "No Preference",
    description: "I eat everything",
    icon: <Text className="text-2xl">🍽️</Text>,
  },
];

const mealOptions = [1, 2, 3, 4, 5];

export default function NutritionStep({ data, updateData }: NutritionStepProps) {
  const { colorScheme } = useColorScheme();

  const form = useForm({
    defaultValues: {
      allergies: data.allergies?.join(", ") || "",
    },
  });

  const handleDietTypeSelect = (dietType: DietType) => {
    updateData({ diet_type: dietType });
  };

  const handleAllergiesChange = (allergiesText: string) => {
    const allergiesArray = allergiesText
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);
    updateData({ allergies: allergiesArray });
  };

  const handleMealsPerDaySelect = (meals: number) => {
    updateData({ meals_per_day: meals });
  };

  const handleSupplementsToggle = (usesSupplements: boolean) => {
    updateData({ uses_supplements: usesSupplements });
  };

  return (
    <View className="flex-1 py-8">
      <View className="mb-8">
        <H1 className="mb-2">Nutrition Preferences</H1>
        <Muted>Help us understand your dietary habits and preferences</Muted>
      </View>

      <View className="gap-8">
        {/* Diet Type */}
        <View>
          <H2 className="mb-4">What's your diet type?</H2>
          <View className="gap-3">
            {dietTypeOptions.map((option) => (
              <Pressable
                key={option.value}
                onPress={() => handleDietTypeSelect(option.value)}
                className={`p-4 rounded-lg border-2 ${
                  data.diet_type === option.value
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <View className="flex-row items-center">
                  <View className="mr-3">{option.icon}</View>
                  <View className="flex-1">
                    <Text
                      className={`font-medium ${data.diet_type === option.value ? "text-primary" : ""}`}
                    >
                      {option.label}
                    </Text>
                    <Text className="text-sm text-muted-foreground mt-1">{option.description}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Allergies */}
        <View>
          <H2 className="mb-4">Allergies or Food Intolerances</H2>
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormInput
                label="Allergies (separated by commas)"
                placeholder="e.g., Nuts, Shellfish, Dairy"
                multiline
                numberOfLines={3}
                {...field}
                onChangeText={(text) => {
                  field.onChange(text);
                  handleAllergiesChange(text);
                }}
              />
            )}
          />
          <Text className="text-sm text-muted-foreground mt-2">
            Leave empty if you have no allergies or intolerances
          </Text>
        </View>

        {/* Meals per day */}
        <View>
          <H2 className="mb-4">How many meals do you eat per day?</H2>
          <View className="flex-row flex-wrap gap-3">
            {mealOptions.map((meals) => (
              <Pressable
                key={meals}
                onPress={() => handleMealsPerDaySelect(meals)}
                className={`min-w-16 p-4 rounded-lg border-2 items-center ${
                  data.meals_per_day === meals
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background"
                }`}
              >
                <Text
                  className={`text-xl font-bold ${data.meals_per_day === meals ? "text-primary" : ""}`}
                >
                  {meals}
                </Text>
                <Text
                  className={`text-sm ${data.meals_per_day === meals ? "text-primary" : "text-muted-foreground"}`}
                >
                  meal{meals !== 1 ? "s" : ""}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Supplements */}
        <View>
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-1">
              <H2>Do you take supplements?</H2>
              <Text className="text-sm text-muted-foreground mt-1">
                Vitamins, protein powder, pre-workout, etc.
              </Text>
            </View>
            <Switch
              checked={data.uses_supplements || false}
              onCheckedChange={handleSupplementsToggle}
            />
          </View>

          {data.uses_supplements && (
            <View className="bg-primary/5 p-4 rounded-lg">
              <View className="flex-row items-center">
                <Pill size={20} color="#3b82f6" />
                <Text className="ml-2 text-primary font-medium">
                  Great! Your AI coach can help optimize supplement timing.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Info Box */}
        <View className="bg-muted/50 p-4 rounded-lg">
          <Text className="text-sm text-muted-foreground">
            💡 This information helps your AI coach provide personalized meal suggestions and track
            your nutrition more accurately.
          </Text>
        </View>
      </View>
    </View>
  );
}
