#!/usr/bin/env node

// Simple debug script to test Supabase connection
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔍 Debugging Supabase Connection...\n");

console.log("Environment Variables:");
console.log("EXPO_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Not set");
console.log("EXPO_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✅ Set" : "❌ Not set");

if (!supabaseUrl || !supabaseAnonKey) {
  console.log("\n❌ Missing environment variables. Please check your .env file.");
  process.exit(1);
}

console.log("\nTesting connection...");

// Test URL accessibility
fetch(supabaseUrl)
  .then((response) => {
    console.log(`✅ Supabase URL is accessible (Status: ${response.status})`);

    // Test Supabase client creation
    try {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      console.log("✅ Supabase client created successfully");

      // Test a simple query (this should work even without authentication)
      return supabase.from("users").select("count", { count: "exact", head: true });
    } catch (error) {
      console.error("❌ Failed to create Supabase client:", error.message);
      throw error;
    }
  })
  .then((result) => {
    if (result.error) {
      console.log(
        "⚠️  Query test completed with error (this may be expected):",
        result.error.message
      );
    } else {
      console.log("✅ Basic query test successful");
    }
    console.log("\n🎉 Supabase connection appears to be working!");
  })
  .catch((error) => {
    console.error("\n❌ Connection test failed:");
    console.error("Error:", error.message);
    console.error("\nPossible solutions:");
    console.error("1. Check your internet connection");
    console.error("2. Verify your Supabase URL and API key");
    console.error("3. Check if your Supabase project is active");
    console.error("4. Try accessing the Supabase URL in your browser");
  });
