import { useState } from "react";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { View } from "lucide-react-native";
import { Platform } from "react-native";

export default function DebugSupabase() {
  const [status, setStatus] = useState("Ready to test");
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    console.log(message);
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testSupabaseStatus = async () => {
    setStatus("Testing...");
    setLogs([]);

    const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
    const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

    addLog(`🔍 Platform: ${Platform.OS}`);
    addLog(`🔍 URL: ${url}`);
    addLog(`🔍 Key length: ${key?.length || 0}`);

    if (!url || !key) {
      addLog("❌ Missing environment variables");
      setStatus("❌ Configuration Error");
      return;
    }

    // Test 1: Basic connectivity
    try {
      addLog("🌐 Testing basic connectivity...");
      const basicResponse = await fetch("https://httpbin.org/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      addLog(`✅ Basic connectivity: ${basicResponse.status}`);
    } catch (error) {
      addLog(`❌ Basic connectivity failed: ${error instanceof Error ? error.message : "Unknown"}`);
    }

    // Test 2: Supabase domain resolution
    try {
      addLog("🏠 Testing Supabase domain...");
      const domainResponse = await fetch(url, {
        method: "HEAD",
      });
      addLog(`✅ Supabase domain accessible: ${domainResponse.status}`);
    } catch (error) {
      addLog(`❌ Supabase domain failed: ${error instanceof Error ? error.message : "Unknown"}`);
    }

    // Test 3: Supabase health check
    try {
      addLog("🏥 Testing Supabase health...");
      const healthResponse = await fetch(`${url}/rest/v1/`, {
        method: "GET",
        headers: {
          apikey: key,
          "Content-Type": "application/json",
        },
      });
      addLog(`✅ Supabase health check: ${healthResponse.status}`);
    } catch (error) {
      addLog(
        `❌ Supabase health check failed: ${error instanceof Error ? error.message : "Unknown"}`
      );
    }

    // Test 4: Auth endpoint specifically
    try {
      addLog("🔐 Testing auth endpoint...");
      const authResponse = await fetch(`${url}/auth/v1/settings`, {
        method: "GET",
        headers: {
          apikey: key,
          "Content-Type": "application/json",
        },
      });
      addLog(`✅ Auth endpoint: ${authResponse.status}`);

      if (authResponse.ok) {
        const authData = await authResponse.json();
        addLog(`✅ Auth settings: ${JSON.stringify(authData).substring(0, 100)}...`);
      }
    } catch (error) {
      addLog(`❌ Auth endpoint failed: ${error instanceof Error ? error.message : "Unknown"}`);
    }

    // Test 5: Simple signup test
    try {
      addLog("📝 Testing signup endpoint...");
      const signupResponse = await fetch(`${url}/auth/v1/signup`, {
        method: "POST",
        headers: {
          apikey: key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "test@test.com",
          password: "testpassword",
        }),
      });
      addLog(`✅ Signup endpoint response: ${signupResponse.status}`);

      if (!signupResponse.ok) {
        const errorData = await signupResponse.text();
        addLog(`⚠️ Signup error details: ${errorData.substring(0, 200)}`);
      }
    } catch (error) {
      addLog(`❌ Signup test failed: ${error instanceof Error ? error.message : "Unknown"}`);
    }

    setStatus("✅ Tests completed");
  };

  return (
    <SafeAreaView className="flex-1 bg-background p-4">
      <View className="flex-1 gap-4">
        <H1>Supabase Debug</H1>

        <View className="gap-2">
          <Text className="font-semibold">Status: {status}</Text>
          <Button onPress={testSupabaseStatus}>
            <Text>Test Supabase Connection</Text>
          </Button>
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
