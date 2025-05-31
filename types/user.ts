export type Gender = "male" | "female" | "non-binary" | "prefer-not-to-say";

export type FitnessGoal = "lose-weight" | "build-muscle" | "stay-fit" | "just-exploring";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "very-active";

export type DietType = "vegetarian" | "vegan" | "keto" | "high-protein" | "no-preference";

export type GymExperience = "less-than-1-month" | "1-3-months" | "3-6-months" | "6-plus-months";

export type WorkoutTime = "morning" | "afternoon" | "evening" | "varies";

export type UnitSystem = "metric" | "imperial";

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  nickname?: string;
  profile_picture?: string;

  // Basic Info
  gender?: Gender;
  date_of_birth?: string;
  height?: number; // in cm
  weight?: number; // in kg
  unit_system: UnitSystem;

  // Fitness Info
  fitness_goal?: FitnessGoal;
  activity_level?: ActivityLevel;

  // Gym Info
  goes_to_gym?: boolean;
  gym_experience?: GymExperience;
  workout_time?: WorkoutTime;
  workout_days_per_week?: number;
  home_outdoor_exercise?: string;

  // Nutrition Info
  diet_type?: DietType;
  allergies?: string[];
  meals_per_day?: number;
  uses_supplements?: boolean;

  // Personalization
  motivation_level?: number; // 1-10
  biggest_challenge?: string;
  wants_reminders?: boolean;

  // Onboarding
  onboarding_completed: boolean;
  onboarding_step?: number;

  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface DailyStats {
  id: string;
  user_id: string;
  date: string;
  steps: number;
  calories_burned: number;
  water_intake: number; // in glasses
  workouts_completed: number;
  weight?: number; // daily weight log
  created_at: string;
  updated_at: string;
}

export interface WorkoutSession {
  id: string;
  user_id: string;
  name: string;
  type: string; // 'strength', 'cardio', 'hiit', etc.
  duration_minutes: number;
  calories_burned?: number;
  notes?: string;
  completed_at: string;
  created_at: string;
}

export interface FoodEntry {
  id: string;
  user_id: string;
  food_name: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  quantity?: string;
  logged_at: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  mood?: number; // 1-10
  energy_level?: number; // 1-10
  notes?: string;
  progress_photos?: string[];
  date: string;
  created_at: string;
}

export interface AIConversation {
  id: string;
  user_id: string;
  message: string;
  response: string;
  context_data?: Record<string, unknown>;
  created_at: string;
}
