import { useAuth } from "@/context/supabase-provider";
import {
  createJournalEntry,
  createUserProfile,
  getTodayFoodEntries,
  getTodayStats,
  getUserJournalEntries,
  getUserProfile,
  getUserWorkouts,
  logFood,
  logWorkout,
  updateDailyStats,
  updateUserProfile,
} from "@/lib/database";
import type {
  DailyStats,
  FoodEntry,
  JournalEntry,
  UserProfile,
  WorkoutSession,
} from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// User Profile Hooks
export function useUserProfile() {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["userProfile", session?.user?.id],
    queryFn: () => (session?.user?.id ? getUserProfile(session.user.id) : null),
    enabled: !!session?.user?.id,
  });
}

export function useCreateUserProfile() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (profile: Omit<UserProfile, "id" | "created_at" | "updated_at">) =>
      createUserProfile(profile),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", session?.user?.id],
      });
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (updates: Partial<UserProfile>) =>
      session?.user?.id ? updateUserProfile(session.user.id, updates) : Promise.resolve(null),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile", session?.user?.id],
      });
    },
  });
}

// Daily Stats Hooks
export function useTodayStats() {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["todayStats", session?.user?.id],
    queryFn: () => (session?.user?.id ? getTodayStats(session.user.id) : null),
    enabled: !!session?.user?.id,
  });
}

export function useUpdateDailyStats() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (
      stats: Partial<Omit<DailyStats, "id" | "user_id" | "created_at" | "updated_at">>
    ) => (session?.user?.id ? updateDailyStats(session.user.id, stats) : Promise.resolve(null)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todayStats", session?.user?.id],
      });
    },
  });
}

// Workout Hooks
export function useLogWorkout() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (workout: Omit<WorkoutSession, "id" | "created_at" | "user_id">) =>
      logWorkout({
        ...workout,
        user_id: session?.user?.id || "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workouts", session?.user?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["todayStats", session?.user?.id],
      });
    },
  });
}

export function useUserWorkouts(limit = 10) {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["workouts", session?.user?.id, limit],
    queryFn: () => (session?.user?.id ? getUserWorkouts(session.user.id, limit) : []),
    enabled: !!session?.user?.id,
  });
}

// Food Entry Hooks
export function useLogFood() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (food: Omit<FoodEntry, "id" | "created_at" | "user_id">) =>
      logFood({
        ...food,
        user_id: session?.user?.id || "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todayFood", session?.user?.id],
      });
    },
  });
}

export function useTodayFoodEntries() {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["todayFood", session?.user?.id],
    queryFn: () => (session?.user?.id ? getTodayFoodEntries(session.user.id) : []),
    enabled: !!session?.user?.id,
  });
}

// Journal Hooks
export function useCreateJournalEntry() {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    mutationFn: (entry: Omit<JournalEntry, "id" | "created_at" | "user_id">) =>
      createJournalEntry({
        ...entry,
        user_id: session?.user?.id || "",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["journalEntries", session?.user?.id],
      });
    },
  });
}

export function useUserJournalEntries(limit = 10) {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["journalEntries", session?.user?.id, limit],
    queryFn: () => (session?.user?.id ? getUserJournalEntries(session.user.id, limit) : []),
    enabled: !!session?.user?.id,
  });
}
