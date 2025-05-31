import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function DebugEnv() {
  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 gap-4">
        <H1>Environment Debug</H1>

        <View className="gap-2">
          <Text className="font-semibold">Environment Variables:</Text>
          <Text className="text-sm">
            EXPO_PUBLIC_SUPABASE_URL:{" "}
            {process.env.EXPO_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Not set"}
          </Text>
          <Text className="text-sm">
            EXPO_PUBLIC_SUPABASE_ANON_KEY:{" "}
            {process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Not set"}
          </Text>

          {process.env.EXPO_PUBLIC_SUPABASE_URL && (
            <View className="mt-4">
              <Text className="font-semibold">URL Value:</Text>
              <Text className="text-xs font-mono">{process.env.EXPO_PUBLIC_SUPABASE_URL}</Text>
            </View>
          )}

          {process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY && (
            <View className="mt-4">
              <Text className="font-semibold">Key Value (first 50 chars):</Text>
              <Text className="text-xs font-mono">
                {process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY.substring(0, 50)}...
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
