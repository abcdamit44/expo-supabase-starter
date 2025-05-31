import { FontShowcase } from "@/components/font_showcase";
import { SafeAreaView, ScrollView } from "react-native";

export default function FontDemoScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FontShowcase />
      </ScrollView>
    </SafeAreaView>
  );
}
