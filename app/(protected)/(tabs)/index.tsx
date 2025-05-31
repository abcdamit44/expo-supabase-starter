import {
  Activity,
  Calendar,
  Droplets,
  Flame,
  MessageCircle,
  Target,
  TrendingUp,
} from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";

import ProgressTracker from "@/app/_components/progress_tracker";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H3, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const [showProgressTracker, setShowProgressTracker] = useState(false);

  const todaysStats = [
    {
      label: "Steps",
      value: "0",
      target: "10,000",
      icon: Activity,
      color: "#10b981",
    },
    {
      label: "Calories Burned",
      value: "0",
      target: "500",
      icon: Flame,
      color: "#f59e0b",
    },
    {
      label: "Water Intake",
      value: "0",
      target: "8",
      icon: Droplets,
      color: "#3b82f6",
    },
    {
      label: "Workouts",
      value: "0",
      target: "1",
      icon: Target,
      color: "#8b5cf6",
    },
  ];

  const motivationalQuotes = [
    "Your body can do it. It's your mind you need to convince.",
    "The only bad workout is the one that didn't happen.",
    "Fitness is not about being better than someone else. It's about being better than you used to be.",
  ];

  const todaysQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-6">
          <H1 className="mb-2">Good morning! 👋</H1>
          <Muted>Ready to crush your health goals today?</Muted>
        </View>

        {/* Daily Stats Grid */}
        <View className="mb-6">
          <H3 className="mb-4">Today's Overview</H3>
          <View className="flex-row flex-wrap gap-3">
            {todaysStats.map((stat, index) => (
              <View
                key={index}
                className="flex-1 min-w-[45%] bg-card rounded-xl p-4 border border-border"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <stat.icon size={20} color={stat.color} />
                  <Text className="text-xs text-muted-foreground">{stat.label}</Text>
                </View>
                <Text className="text-2xl font-bold mb-1">{stat.value}</Text>
                <Text className="text-xs text-muted-foreground">of {stat.target}</Text>
                <View className="mt-2 bg-muted rounded-full h-1">
                  <View
                    className="bg-primary rounded-full h-1 w-0"
                    style={{ backgroundColor: stat.color }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Motivational Quote */}
        <View className="mb-6">
          <View className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 border border-border">
            <View className="flex-row items-center mb-3">
              <TrendingUp size={20} color={iconColor} />
              <Text className="ml-2 font-medium">Daily Motivation</Text>
            </View>
            <Text className="text-lg italic text-center leading-6">"{todaysQuote}"</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <H3 className="mb-4">Quick Actions</H3>
          <View className="flex-row gap-3 mb-3">
            <Button variant="outline" className="flex-1">
              <Activity size={16} color={iconColor} />
              <Text className="ml-2">Log Workout</Text>
            </Button>
            <Button variant="outline" className="flex-1">
              <Droplets size={16} color={iconColor} />
              <Text className="ml-2">Add Water</Text>
            </Button>
          </View>
          <View className="flex-row gap-3">
            <Button variant="outline" className="flex-1">
              <Flame size={16} color={iconColor} />
              <Text className="ml-2">Log Meal</Text>
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageCircle size={16} color={iconColor} />
              <Text className="ml-2">AI Coach</Text>
            </Button>
          </View>
        </View>

        {/* Weekly Progress */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <H3>This Week's Progress</H3>
            <Button size="sm" variant="ghost" onPress={() => setShowProgressTracker(true)}>
              <Calendar size={16} color={iconColor} />
              <Text className="ml-2">View Details</Text>
            </Button>
          </View>
          <View className="bg-card rounded-xl p-6 border border-border">
            <Text className="text-center text-muted-foreground mb-4">
              No data recorded yet this week
            </Text>
            <Text className="text-center text-sm text-muted-foreground mb-4">
              Start logging your activities to see your progress trends
            </Text>
            <Button variant="default" className="w-full">
              <Activity size={16} color="#ffffff" />
              <Text className="ml-2 text-white">Start Tracking</Text>
            </Button>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <H3 className="mb-4">Recent Activity</H3>
          <View className="bg-card rounded-xl p-6 border border-border">
            <Text className="text-center text-muted-foreground mb-4">No recent activities</Text>
            <Text className="text-center text-sm text-muted-foreground">
              Your logged workouts, meals, and achievements will appear here
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Progress Tracker Modal */}
      <Modal visible={showProgressTracker} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1">
          <View className="flex-row items-center justify-between p-4 border-b border-border">
            <H3>Progress Tracker</H3>
            <Button variant="ghost" size="sm" onPress={() => setShowProgressTracker(false)}>
              <Text>Done</Text>
            </Button>
          </View>
          <ProgressTracker />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
