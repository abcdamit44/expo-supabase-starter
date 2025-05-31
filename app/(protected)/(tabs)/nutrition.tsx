import { BarChart3, Plus, Target, Utensils } from "lucide-react-native";
import React, { useState } from "react";
import { Modal, View } from "react-native";

import FoodTracker from "@/app/_components/food_tracker";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H3, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function NutritionScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const [showFoodTracker, setShowFoodTracker] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4 border-b border-border">
        <H1 className="mb-2">Nutrition Tracker</H1>
        <Muted>Plan your meals and track your nutrition goals</Muted>
      </View>

      {/* Quick Actions */}
      <View className="p-4">
        <View className="flex-row gap-3 mb-6">
          <View className="flex-1">
            <Button
              variant="default"
              className="w-full h-20"
              onPress={() => setShowFoodTracker(true)}
            >
              <View className="items-center">
                <Utensils size={20} color="#ffffff" />
                <Text className="mt-2 text-sm text-white">Track Food</Text>
              </View>
            </Button>
          </View>
          <View className="flex-1">
            <Button variant="outline" className="w-full h-20">
              <View className="items-center">
                <BarChart3 size={20} color={iconColor} />
                <Text className="mt-2 text-sm">View Reports</Text>
              </View>
            </Button>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mb-6">
          <H3 className="mb-4">Today's Overview</H3>
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1 bg-card rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Target size={20} color={iconColor} />
                <Text className="text-sm font-medium text-muted-foreground">Calories</Text>
              </View>
              <Text className="text-2xl font-bold">0</Text>
              <Text className="text-xs text-muted-foreground">of 2000</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Target size={20} color={iconColor} />
                <Text className="text-sm font-medium text-muted-foreground">Protein</Text>
              </View>
              <Text className="text-2xl font-bold">0g</Text>
              <Text className="text-xs text-muted-foreground">of 150g</Text>
            </View>
          </View>
        </View>

        {/* Meal Summary */}
        <View>
          <H3 className="mb-4">Today's Meals</H3>
          {["Breakfast", "Lunch", "Dinner", "Snacks"].map((meal) => (
            <View key={meal} className="bg-card rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium">{meal}</Text>
                  <Text className="text-sm text-muted-foreground">0 calories</Text>
                </View>
                <Button size="sm" variant="outline" onPress={() => setShowFoodTracker(true)}>
                  <Plus size={16} color={iconColor} />
                </Button>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Food Tracker Modal */}
      <Modal visible={showFoodTracker} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <H3>Food Tracker</H3>
            <Button variant="ghost" size="sm" onPress={() => setShowFoodTracker(false)}>
              <Text>Close</Text>
            </Button>
          </View>
          <FoodTracker />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
