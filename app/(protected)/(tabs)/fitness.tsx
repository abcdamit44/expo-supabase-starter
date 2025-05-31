import {
  BarChart3,
  Bot,
  Calendar,
  Dumbbell,
  MessageCircle,
  Plus,
  Target,
} from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";

import AiCoach from "@/app/_components/ai_coach";
import WorkoutLogger from "@/app/_components/workout_logger";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H3, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function FitnessScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const [showAiCoach, setShowAiCoach] = useState(false);
  const [showWorkoutLogger, setShowWorkoutLogger] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <H1 className="mb-2">Fitness Tracker</H1>
          <Muted>Track your workouts and build healthy habits</Muted>
        </View>

        {/* AI Coach Section */}
        <View className="mb-6">
          <H3 className="mb-4">AI Fitness Coach</H3>
          <View className="bg-gradient-to-r bg-card rounded-xl p-6 border border-border">
            <View className="flex-row items-center mb-4">
              <View className="w-12 h-12 bg-primary/10 rounded-full items-center justify-center mr-3">
                <Bot size={24} color="#3b82f6" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-lg">Your AI Coach</Text>
                <Text className="text-sm text-muted-foreground">
                  Get personalized fitness guidance
                </Text>
              </View>
            </View>
            <Text className="text-sm text-muted-foreground mb-4">
              Ask questions about workouts, get exercise recommendations, or need motivation? Your
              AI coach is here to help!
            </Text>
            <Button variant="default" className="w-full" onPress={() => setShowAiCoach(true)}>
              <MessageCircle size={16} color="#ffffff" />
              <Text className="ml-2 text-white">Chat with AI Coach</Text>
            </Button>
          </View>
        </View>

        {/* Quick Stats */}
        <View className="mb-6">
          <H3 className="mb-4">Today's Overview</H3>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <Target size={20} color={iconColor} />
                <Text className="text-sm font-medium text-muted-foreground">Workouts</Text>
              </View>
              <Text className="text-2xl font-bold">0</Text>
              <Text className="text-xs text-muted-foreground">completed</Text>
            </View>
            <View className="flex-1 bg-card rounded-xl p-4 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <BarChart3 size={20} color={iconColor} />
                <Text className="text-sm font-medium text-muted-foreground">Calories</Text>
              </View>
              <Text className="text-2xl font-bold">0</Text>
              <Text className="text-xs text-muted-foreground">burned</Text>
            </View>
          </View>
        </View>

        {/* Workout Plans */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <H3>Quick Actions</H3>
          </View>
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button
                variant="outline"
                className="w-full h-20"
                onPress={() => setShowWorkoutLogger(true)}
              >
                <View className="items-center">
                  <Dumbbell size={20} color={iconColor} />
                  <Text className="mt-2 text-sm">Log Workout</Text>
                </View>
              </Button>
            </View>
            <View className="flex-1">
              <Button variant="outline" className="w-full h-20">
                <View className="items-center">
                  <Plus size={20} color={iconColor} />
                  <Text className="mt-2 text-sm">New Plan</Text>
                </View>
              </Button>
            </View>
          </View>
        </View>

        {/* Recent Workouts */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <H3>Recent Workouts</H3>
            <Button size="sm" variant="ghost">
              <Calendar size={16} color={iconColor} />
              <Text className="ml-2">View All</Text>
            </Button>
          </View>
          <View className="bg-card rounded-xl p-6 border border-border">
            <Text className="text-center text-muted-foreground mb-4">No workouts logged yet</Text>
            <Text className="text-center text-sm text-muted-foreground mb-4">
              Start your fitness journey by logging your first workout
            </Text>
            <Button variant="outline" className="w-full" onPress={() => setShowWorkoutLogger(true)}>
              <Plus size={16} color={iconColor} />
              <Text className="ml-2">Log Workout</Text>
            </Button>
          </View>
        </View>
      </ScrollView>

      {/* AI Coach Modal */}
      <Modal visible={showAiCoach} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <H3>AI Fitness Coach</H3>
            <Button variant="ghost" size="sm" onPress={() => setShowAiCoach(false)}>
              <Text>Close</Text>
            </Button>
          </View>
          <AiCoach />
        </SafeAreaView>
      </Modal>

      {/* Workout Logger Modal */}
      <Modal visible={showWorkoutLogger} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-background">
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <H3>Log Workout</H3>
            <Button variant="ghost" size="sm" onPress={() => setShowWorkoutLogger(false)}>
              <Text>Close</Text>
            </Button>
          </View>
          <WorkoutLogger />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
