import { Award, Calendar, Target, TrendingUp } from "lucide-react-native";
import { Dimensions, ScrollView, View } from "react-native";

import { Text } from "@/components/ui/text";
import { H3, H4, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

const { width } = Dimensions.get("window");

interface ProgressData {
  date: string;
  value: number;
}

interface ProgressCardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  data: ProgressData[];
}

function ProgressCard({ title, value, unit, change, changeType, icon }: ProgressCardProps) {
  const { colorScheme } = useColorScheme();

  const changeColor =
    changeType === "positive"
      ? "text-green-500"
      : changeType === "negative"
        ? "text-red-500"
        : "text-muted-foreground";

  return (
    <View className="bg-card rounded-xl p-4 border border-border mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          {icon}
          <Text className="font-medium">{title}</Text>
        </View>
        <View className="items-end">
          <Text className="text-2xl font-bold">
            {value}
            <Text className="text-sm text-muted-foreground"> {unit}</Text>
          </Text>
          <Text className={`text-sm ${changeColor}`}>{change}</Text>
        </View>
      </View>

      {/* Simple progress visualization */}
      <View className="h-2 bg-muted rounded-full">
        <View className="h-2 bg-primary rounded-full" style={{ width: "65%" }} />
      </View>
    </View>
  );
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  progress: number;
  target: number;
}

const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "First Workout",
    description: "Complete your first workout session",
    icon: "🏋️",
    completed: false,
    progress: 0,
    target: 1,
  },
  {
    id: "2",
    title: "Week Warrior",
    description: "Exercise 7 days in a row",
    icon: "🔥",
    completed: false,
    progress: 2,
    target: 7,
  },
  {
    id: "3",
    title: "Nutrition Ninja",
    description: "Track meals for 5 consecutive days",
    icon: "🥗",
    completed: false,
    progress: 1,
    target: 5,
  },
  {
    id: "4",
    title: "Early Bird",
    description: "Complete 10 morning workouts",
    icon: "🌅",
    completed: false,
    progress: 3,
    target: 10,
  },
];

export default function ProgressTracker() {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const mockData: ProgressData[] = [
    { date: "2025-05-25", value: 45 },
    { date: "2025-05-26", value: 52 },
    { date: "2025-05-27", value: 48 },
    { date: "2025-05-28", value: 61 },
    { date: "2025-05-29", value: 55 },
    { date: "2025-05-30", value: 58 },
    { date: "2025-05-31", value: 63 },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4">
        <H3 className="mb-4">Your Progress</H3>

        {/* Weekly Overview */}
        <View className="mb-6">
          <H4 className="mb-3">This Week</H4>

          <ProgressCard
            title="Workouts Completed"
            value="3"
            unit="sessions"
            change="+2 from last week"
            changeType="positive"
            icon={<TrendingUp size={20} color={iconColor} />}
            data={mockData}
          />

          <ProgressCard
            title="Calories Burned"
            value="1,240"
            unit="kcal"
            change="+180 from last week"
            changeType="positive"
            icon={<Target size={20} color={iconColor} />}
            data={mockData}
          />

          <ProgressCard
            title="Active Days"
            value="5"
            unit="days"
            change="Same as last week"
            changeType="neutral"
            icon={<Calendar size={20} color={iconColor} />}
            data={mockData}
          />
        </View>

        {/* Achievements Section */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-4">
            <Award size={20} color={iconColor} />
            <H4>Achievements</H4>
          </View>

          {MOCK_ACHIEVEMENTS.map((achievement) => (
            <View key={achievement.id} className="bg-card rounded-xl p-4 mb-3 border border-border">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">{achievement.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-semibold">{achievement.title}</Text>
                    <Text className="text-sm text-muted-foreground">{achievement.description}</Text>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-sm font-medium">
                    {achievement.progress}/{achievement.target}
                  </Text>
                </View>
              </View>

              {/* Progress bar */}
              <View className="h-2 bg-muted rounded-full">
                <View
                  className="h-2 bg-primary rounded-full"
                  style={{
                    width: `${(achievement.progress / achievement.target) * 100}%`,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Monthly Summary */}
        <View className="mb-6">
          <H4 className="mb-3">Monthly Summary</H4>
          <View className="bg-card rounded-xl p-4 border border-border">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="font-medium">May 2025</Text>
              <Text className="text-sm text-muted-foreground">31 days</Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <View className="items-center">
                <Text className="text-2xl font-bold">12</Text>
                <Text className="text-xs text-muted-foreground">Workouts</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold">3.2k</Text>
                <Text className="text-xs text-muted-foreground">Calories</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold">18</Text>
                <Text className="text-xs text-muted-foreground">Active Days</Text>
              </View>
              <View className="items-center">
                <Text className="text-2xl font-bold">2.5</Text>
                <Text className="text-xs text-muted-foreground">Avg/week</Text>
              </View>
            </View>

            <Muted className="text-center">
              Great job! You're 58% more active than last month.
            </Muted>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
