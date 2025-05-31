import { Camera, Clock, Plus, Search } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H3, H4 } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  serving: string;
}

interface LoggedFood extends FoodItem {
  quantity: number;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  loggedAt: Date;
}

// Mock food database
const FOOD_DATABASE: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Breast (grilled)",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    serving: "100g",
  },
  {
    id: "2",
    name: "Brown Rice (cooked)",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    serving: "100g",
  },
  {
    id: "3",
    name: "Broccoli (steamed)",
    calories: 35,
    protein: 2.4,
    carbs: 7,
    fat: 0.4,
    serving: "100g",
  },
  {
    id: "4",
    name: "Banana (medium)",
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fat: 0.4,
    serving: "1 medium",
  },
  {
    id: "5",
    name: "Greek Yogurt (plain)",
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    serving: "100g",
  },
  {
    id: "6",
    name: "Oatmeal (cooked)",
    calories: 68,
    protein: 2.4,
    carbs: 12,
    fat: 1.4,
    serving: "100g",
  },
  {
    id: "7",
    name: "Salmon (grilled)",
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 12,
    serving: "100g",
  },
  {
    id: "8",
    name: "Avocado",
    calories: 160,
    protein: 2,
    carbs: 9,
    fat: 15,
    serving: "100g",
  },
];

export default function FoodTracker() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<
    "breakfast" | "lunch" | "dinner" | "snack"
  >("breakfast");
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const filteredFoods = FOOD_DATABASE.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addFood = (food: FoodItem, quantity = 1) => {
    const loggedFood: LoggedFood = {
      ...food,
      quantity,
      mealType: selectedMealType,
      loggedAt: new Date(),
    };
    setLoggedFoods((prev) => [...prev, loggedFood]);
    setShowSearch(false);
    setSearchQuery("");
    Alert.alert("Success", `${food.name} added to ${selectedMealType}!`);
  };

  const getTotalNutrition = () => {
    return loggedFoods.reduce(
      (total, food) => ({
        calories: total.calories + food.calories * food.quantity,
        protein: total.protein + food.protein * food.quantity,
        carbs: total.carbs + food.carbs * food.quantity,
        fat: total.fat + food.fat * food.quantity,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const getMealFoods = (mealType: string) => {
    return loggedFoods.filter((food) => food.mealType === mealType);
  };

  const getMealCalories = (mealType: string) => {
    return getMealFoods(mealType).reduce((total, food) => total + food.calories * food.quantity, 0);
  };

  const totalNutrition = getTotalNutrition();

  if (showSearch) {
    return (
      <View className="flex-1 bg-background">
        <View className="p-4 border-b border-border">
          <View className="flex-row items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onPress={() => setShowSearch(false)}>
              <Text>Back</Text>
            </Button>
            <Text className="flex-1 text-lg font-semibold">Add Food</Text>
          </View>

          <View className="relative">
            <Search
              size={20}
              color={iconColor}
              style={{ position: "absolute", left: 12, top: 12, zIndex: 1 }}
            />
            <TextInput
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-foreground"
              placeholder="Search foods..."
              placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          {filteredFoods.map((food) => (
            <View key={food.id} className="bg-card rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold flex-1">{food.name}</Text>
                <Button size="sm" onPress={() => addFood(food)}>
                  <Plus size={16} color="#ffffff" />
                </Button>
              </View>
              <Text className="text-sm text-muted-foreground mb-1">
                {food.serving} • {food.calories} cal
              </Text>
              <View className="flex-row gap-4">
                <Text className="text-xs text-muted-foreground">P: {food.protein}g</Text>
                <Text className="text-xs text-muted-foreground">C: {food.carbs}g</Text>
                <Text className="text-xs text-muted-foreground">F: {food.fat}g</Text>
              </View>
            </View>
          ))}

          {filteredFoods.length === 0 && searchQuery && (
            <View className="bg-card rounded-xl p-6 border border-border">
              <Text className="text-center text-muted-foreground mb-4">
                No foods found for "{searchQuery}"
              </Text>
              <Button variant="outline" className="w-full">
                <Camera size={16} color={iconColor} />
                <Text className="ml-2">Scan Barcode</Text>
              </Button>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Daily Summary */}
      <View className="p-4 bg-card border-b border-border">
        <H3 className="mb-4">Today's Nutrition</H3>
        <View className="flex-row gap-3">
          <View className="flex-1 bg-background rounded-xl p-3 border border-border">
            <Text className="text-2xl font-bold text-center">
              {Math.round(totalNutrition.calories)}
            </Text>
            <Text className="text-sm text-muted-foreground text-center">Calories</Text>
          </View>
          <View className="flex-1 bg-background rounded-xl p-3 border border-border">
            <Text className="text-2xl font-bold text-center">
              {Math.round(totalNutrition.protein)}g
            </Text>
            <Text className="text-sm text-muted-foreground text-center">Protein</Text>
          </View>
          <View className="flex-1 bg-background rounded-xl p-3 border border-border">
            <Text className="text-2xl font-bold text-center">
              {Math.round(totalNutrition.carbs)}g
            </Text>
            <Text className="text-sm text-muted-foreground text-center">Carbs</Text>
          </View>
          <View className="flex-1 bg-background rounded-xl p-3 border border-border">
            <Text className="text-2xl font-bold text-center">
              {Math.round(totalNutrition.fat)}g
            </Text>
            <Text className="text-sm text-muted-foreground text-center">Fat</Text>
          </View>
        </View>
      </View>

      {/* Meal Selector */}
      <View className="p-4 border-b border-border">
        <View className="flex-row gap-2">
          {(["breakfast", "lunch", "dinner", "snack"] as const).map((meal) => (
            <Button
              key={meal}
              variant={selectedMealType === meal ? "default" : "outline"}
              size="sm"
              className="flex-1"
              onPress={() => setSelectedMealType(meal)}
            >
              <Text className={selectedMealType === meal ? "text-white" : ""}>
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </Text>
            </Button>
          ))}
        </View>
      </View>

      {/* Meals */}
      <View className="p-4">
        {(["breakfast", "lunch", "dinner", "snack"] as const).map((mealType) => {
          const mealFoods = getMealFoods(mealType);
          const mealCalories = getMealCalories(mealType);

          return (
            <View key={mealType} className="mb-6">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center gap-2">
                  <Clock size={16} color={iconColor} />
                  <H4>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</H4>
                  {mealCalories > 0 && (
                    <Text className="text-sm text-muted-foreground">
                      {Math.round(mealCalories)} cal
                    </Text>
                  )}
                </View>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => {
                    setSelectedMealType(mealType);
                    setShowSearch(true);
                  }}
                >
                  <Plus size={16} color={iconColor} />
                </Button>
              </View>

              {mealFoods.length > 0 ? (
                <View className="space-y-2">
                  {mealFoods.map((food, index) => (
                    <View
                      key={`${food.id}-${index}`}
                      className="bg-card rounded-lg p-3 border border-border"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="flex-1">
                          <Text className="font-medium">{food.name}</Text>
                          <Text className="text-sm text-muted-foreground">
                            {food.quantity} × {food.serving} •{" "}
                            {Math.round(food.calories * food.quantity)} cal
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="bg-card rounded-lg p-4 border border-border border-dashed">
                  <Text className="text-center text-muted-foreground">
                    No foods logged for {mealType}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
