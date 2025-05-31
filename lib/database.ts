import { supabase } from "@/config/supabase";
import type {
  DailyStats,
  FoodEntry,
  JournalEntry,
  UserProfile,
  WorkoutSession,
} from "@/types/user";

// User Profile Functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }

  return data;
}

export async function createUserProfile(
  profile: Omit<UserProfile, "id" | "created_at" | "updated_at">
): Promise<UserProfile | null> {
  const { data, error } = await supabase.from("user_profiles").insert(profile).select().single();

  if (error) {
    console.error("Error creating user profile:", error);
    return null;
  }

  return data;
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("user_profiles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating user profile:", error);
    return null;
  }

  return data;
}

// Daily Stats Functions
export async function getTodayStats(userId: string): Promise<DailyStats | null> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("daily_stats")
    .select("*")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 = no rows found
    console.error("Error fetching today stats:", error);
    return null;
  }

  return data || null;
}

export async function updateDailyStats(
  userId: string,
  stats: Partial<Omit<DailyStats, "id" | "user_id" | "created_at" | "updated_at">>
): Promise<DailyStats | null> {
  const today = new Date().toISOString().split("T")[0];

  // Try to update existing record first
  const { data: existingData, error: fetchError } = await supabase
    .from("daily_stats")
    .select("id")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  if (existingData) {
    // Update existing record
    const { data, error } = await supabase
      .from("daily_stats")
      .update({ ...stats, updated_at: new Date().toISOString() })
      .eq("id", existingData.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating daily stats:", error);
      return null;
    }

    return data;
  }

  // Create new record
  const { data, error } = await supabase
    .from("daily_stats")
    .insert({
      user_id: userId,
      date: today,
      steps: 0,
      calories_burned: 0,
      water_intake: 0,
      workouts_completed: 0,
      ...stats,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating daily stats:", error);
    return null;
  }

  return data;
}

// Workout Functions
export async function logWorkout(
  workout: Omit<WorkoutSession, "id" | "created_at">
): Promise<WorkoutSession | null> {
  const { data, error } = await supabase.from("workout_sessions").insert(workout).select().single();

  if (error) {
    console.error("Error logging workout:", error);
    return null;
  }

  return data;
}

export async function getUserWorkouts(userId: string, limit = 10): Promise<WorkoutSession[]> {
  const { data, error } = await supabase
    .from("workout_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }

  return data || [];
}

// Food Entry Functions
export async function logFood(
  food: Omit<FoodEntry, "id" | "created_at">
): Promise<FoodEntry | null> {
  const { data, error } = await supabase.from("food_entries").insert(food).select().single();

  if (error) {
    console.error("Error logging food:", error);
    return null;
  }

  return data;
}

export async function getTodayFoodEntries(userId: string): Promise<FoodEntry[]> {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("food_entries")
    .select("*")
    .eq("user_id", userId)
    .gte("logged_at", `${today}T00:00:00`)
    .lt("logged_at", `${today}T23:59:59`)
    .order("logged_at", { ascending: false });

  if (error) {
    console.error("Error fetching food entries:", error);
    return [];
  }

  return data || [];
}

// Journal Functions
export async function createJournalEntry(
  entry: Omit<JournalEntry, "id" | "created_at">
): Promise<JournalEntry | null> {
  const { data, error } = await supabase.from("journal_entries").insert(entry).select().single();

  if (error) {
    console.error("Error creating journal entry:", error);
    return null;
  }

  return data;
}

export async function getUserJournalEntries(userId: string, limit = 10): Promise<JournalEntry[]> {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching journal entries:", error);
    return [];
  }

  return data || [];
}
