import { router } from "expo-router";
import {
  Bell,
  ChevronRight,
  FileText,
  LogOut,
  type LucideIcon,
  Settings,
  Shield,
  TrendingUp,
  User,
} from "lucide-react-native";
import React, { useState } from "react";
import { Modal, ScrollView, View } from "react-native";

import ProgressTracker from "@/app/_components/progress_tracker";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, H3, Muted } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";

type ProfileItem = {
  label: string;
  subtitle: string;
  icon?: LucideIcon;
};

type ProfileSection = {
  title: string;
  icon: LucideIcon;
  items: ProfileItem[];
};

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const [showProgressTracker, setShowProgressTracker] = useState(false);

  const profileSections: ProfileSection[] = [
    {
      title: "Progress & Analytics",
      icon: TrendingUp,
      items: [
        {
          label: "View Progress",
          subtitle: "Track your fitness journey & achievements",
        },
      ],
    },
    {
      title: "Health Profile",
      icon: User,
      items: [
        {
          label: "Personal Information",
          subtitle: "Age, weight, height, goals",
        },
        { label: "Medical Reports", subtitle: "Upload blood tests & reports" },
        { label: "Fitness Goals", subtitle: "Update your targets" },
      ],
    },
    {
      title: "App Settings",
      icon: Settings,
      items: [
        {
          label: "Notifications",
          subtitle: "Manage reminders & alerts",
          icon: Bell,
        },
        {
          label: "Privacy & Security",
          subtitle: "Data & account settings",
          icon: Shield,
        },
        { label: "Support", subtitle: "Help & feedback", icon: FileText },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <View className="mb-6">
          <H1 className="mb-2">Profile</H1>
          <Muted>Manage your health profile and app settings</Muted>
        </View>

        {/* User Info Card */}
        <View className="bg-card rounded-xl p-6 border border-border mb-6">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mr-4">
              <User size={32} color="#ffffff" />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold mb-1">Welcome back!</Text>
              <Text className="text-muted-foreground">Complete your profile to get started</Text>
            </View>
          </View>
          <Button
            variant="outline"
            className="w-full"
            onPress={() => router.push("/(protected)/onboarding")}
          >
            <User size={16} color={iconColor} />
            <Text className="ml-2">Complete Onboarding</Text>
          </Button>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <View className="flex-row items-center mb-4">
              <section.icon size={20} color={iconColor} />
              <H3 className="ml-2">{section.title}</H3>
            </View>
            <View className="bg-card rounded-xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto justify-start"
                    onPress={() => {
                      if (item.label === "View Progress") {
                        setShowProgressTracker(true);
                      }
                    }}
                  >
                    <View className="flex-row items-center justify-between p-4 w-full">
                      <View className="flex-1">
                        <Text className="font-medium mb-1">{item.label}</Text>
                        <Text className="text-sm text-muted-foreground">{item.subtitle}</Text>
                      </View>
                      <View className="flex-row items-center">
                        {item.icon && <item.icon size={16} color={iconColor} />}
                        <ChevronRight size={16} color={iconColor} />
                      </View>
                    </View>
                  </Button>
                  {itemIndex < section.items.length - 1 && <View className="h-px bg-border mx-4" />}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Sign Out */}
        <View className="mb-6">
          <View className="bg-card rounded-xl border border-border p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onPress={async () => {
                await signOut();
              }}
            >
              <LogOut size={16} color="#ef4444" />
              <Text className="ml-2 text-destructive">Sign Out</Text>
            </Button>
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
