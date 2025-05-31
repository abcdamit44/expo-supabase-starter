// Alternative networking approach for debugging

import { type SupabaseClient, createClient } from "@supabase/supabase-js";

interface TestResult {
  success: boolean;
  status?: number;
  error?: string;
}

// Test with XMLHttpRequest instead of fetch
export const testWithXHR = (url: string): Promise<{ status: number; success: boolean }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve({
          status: xhr.status,
          success: xhr.status >= 200 && xhr.status < 300,
        });
      }
    };

    xhr.onerror = () => {
      reject(new Error(`XHR request failed for ${url}`));
    };

    xhr.ontimeout = () => {
      reject(new Error(`XHR request timed out for ${url}`));
    };

    xhr.timeout = 10000; // 10 seconds
    xhr.send();
  });
};

// Create a Supabase client with custom fetch
export const createSupabaseClientWithCustomFetch = (url: string, key: string): SupabaseClient => {
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        console.log(`🔄 Custom fetch for: ${input.toString()}`);

        try {
          const response = await fetch(input, {
            ...init,
            headers: {
              ...init?.headers,
              "User-Agent": "expo-app/1.0.0",
            },
          });

          console.log(`✅ Custom fetch response: ${response.status} for ${input.toString()}`);
          return response;
        } catch (error) {
          console.error(`❌ Custom fetch failed for ${input.toString()}:`, error);
          throw error;
        }
      },
    },
  });
};

// Test different network approaches
export const comprehensiveNetworkTest = async (supabaseUrl: string, supabaseKey: string) => {
  const results: Record<string, TestResult> = {};

  // Test 1: XHR
  try {
    console.log("🧪 Testing with XMLHttpRequest...");
    const xhrResult = await testWithXHR(supabaseUrl);
    results.xhr = { success: xhrResult.success, status: xhrResult.status };
    console.log("✅ XHR test passed");
  } catch (error) {
    results.xhr = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    console.log("❌ XHR test failed:", error);
  }

  // Test 2: Standard fetch
  try {
    console.log("🧪 Testing with standard fetch...");
    const fetchResponse = await fetch(supabaseUrl);
    results.fetch = { success: true, status: fetchResponse.status };
    console.log("✅ Standard fetch test passed");
  } catch (error) {
    results.fetch = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    console.log("❌ Standard fetch test failed:", error);
  }

  // Test 3: Custom Supabase client
  try {
    console.log("🧪 Testing with custom Supabase client...");
    const customClient = createSupabaseClientWithCustomFetch(supabaseUrl, supabaseKey);
    const { error } = await customClient.auth.getSession();

    if (error) {
      results.customSupabase = { success: false, error: error.message };
    } else {
      results.customSupabase = { success: true };
    }
    console.log("✅ Custom Supabase client test completed");
  } catch (error) {
    results.customSupabase = {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
    console.log("❌ Custom Supabase client test failed:", error);
  }

  return results;
};
