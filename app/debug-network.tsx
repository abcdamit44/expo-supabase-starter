import { H1 } from "@/components/ui/typography";
import { supabase } from "@/config/supabase";
import { useState } from "react";
import { Button, SafeAreaView, Text, View } from "react-native";

export default function DebugNetwork() {
  const [status, setStatus] = useState("Not tested");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testConnection = async () => {
    setStatus("Testing...");
    setLogs([]);

    try {
      addLog("🔍 Starting connection test...");
      addLog(`URL: ${process.env.EXPO_PUBLIC_SUPABASE_URL}`);
      addLog(`Key: ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Not set"}`);

      // Test 1: Basic internet connectivity
      addLog("🌐 Testing basic internet connectivity...");
      try {
        const googleResponse = await fetch("https://www.google.com", {
          method: "HEAD",
        });
        addLog(`✅ Internet connection: ${googleResponse.status}`);
      } catch (error) {
        addLog(
          `❌ Internet test failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }

      // Test 2: Direct Supabase URL test
      addLog("📡 Testing direct Supabase URL...");
      try {
        const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || "";
        const response = await fetch(supabaseUrl, {
          method: "HEAD",
        });
        addLog(`✅ Supabase URL accessible: ${response.status}`);
      } catch (error) {
        addLog(
          `❌ Supabase URL test failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }

      // Test 3: Supabase auth endpoint
      addLog("🔐 Testing Supabase auth endpoint...");
      try {
        const authUrl = `${process.env.EXPO_PUBLIC_SUPABASE_URL}/auth/v1/settings`;
        const authResponse = await fetch(authUrl, {
          method: "GET",
          headers: {
            apikey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
            "Content-Type": "application/json",
          },
        });
        addLog(`✅ Auth endpoint accessible: ${authResponse.status}`);
      } catch (error) {
        addLog(
          `❌ Auth endpoint test failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }

      // Test 4: Supabase client session
      addLog("🔐 Testing Supabase client session...");
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          addLog(`⚠️ Session test error: ${error.message}`);
        } else {
          addLog("✅ Session test successful");
        }
      } catch (error) {
        addLog(
          `❌ Session test failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }

      // Test 5: Attempt sign up
      addLog("📝 Testing sign up with dummy credentials...");
      try {
        const signUpResult = await supabase.auth.signUp({
          email: "test@example.com",
          password: "testpass123",
        });

        if (signUpResult.error) {
          addLog(`📝 Sign up error: ${signUpResult.error.message}`);
          addLog(`📝 Error status: ${signUpResult.error.status || "No status"}`);
        } else {
          addLog("✅ Sign up test successful");
        }
      } catch (error) {
        addLog(
          `❌ Sign up test failed: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }

      setStatus("✅ Test completed");
    } catch (error) {
      addLog(`❌ Test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      setStatus("❌ Test failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 gap-4">
        <H1>Network Debug</H1>

        <View className="gap-2">
          <Text className="font-semibold">Status: {status}</Text>
          <Button onPress={testConnection} title="Test Connection" />
        </View>

        <View className="flex-1 bg-gray-100 p-3 rounded-md">
          <Text className="font-semibold mb-2">Logs:</Text>
          {logs.map((log, index) => (
            <Text key={index} className="text-xs font-mono mb-1">
              {log}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
