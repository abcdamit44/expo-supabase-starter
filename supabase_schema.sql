-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  full_name TEXT,
  date_of_birth DATE,
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  height DECIMAL(5,2), -- in cm
  weight DECIMAL(5,2), -- in kg
  fitness_goal TEXT CHECK (fitness_goal IN ('lose_weight', 'gain_muscle', 'maintain_weight', 'improve_endurance', 'general_fitness')),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active')),
  unit_system TEXT CHECK (unit_system IN ('metric', 'imperial')) DEFAULT 'metric',
  onboarding_completed BOOLEAN DEFAULT FALSE,
  onboarding_step INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id)
);

-- Daily Stats Table
CREATE TABLE daily_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  steps INTEGER DEFAULT 0,
  calories_burned INTEGER DEFAULT 0,
  calories_consumed INTEGER DEFAULT 0,
  water_intake DECIMAL(5,2) DEFAULT 0, -- in liters
  sleep_hours DECIMAL(3,1) DEFAULT 0,
  weight DECIMAL(5,2), -- daily weight tracking
  mood INTEGER CHECK (mood >= 1 AND mood <= 10),
  energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, date)
);

-- Workout Sessions Table
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT, -- cardio, strength, flexibility, sports, etc.
  duration INTEGER, -- in minutes
  calories_burned INTEGER DEFAULT 0,
  notes TEXT,
  exercises JSONB, -- Array of exercise objects
  completed BOOLEAN DEFAULT FALSE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Food Entries Table
CREATE TABLE food_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')) NOT NULL,
  food_name TEXT NOT NULL,
  quantity DECIMAL(8,2),
  unit TEXT, -- grams, cups, pieces, etc.
  calories INTEGER DEFAULT 0,
  protein DECIMAL(5,2) DEFAULT 0, -- in grams
  carbs DECIMAL(5,2) DEFAULT 0, -- in grams
  fat DECIMAL(5,2) DEFAULT 0, -- in grams
  fiber DECIMAL(5,2) DEFAULT 0, -- in grams
  sugar DECIMAL(5,2) DEFAULT 0, -- in grams
  sodium DECIMAL(7,2) DEFAULT 0, -- in mg
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Journal Entries Table
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  date DATE NOT NULL,
  content TEXT NOT NULL,
  mood INTEGER CHECK (mood >= 1 AND mood <= 10),
  tags TEXT[], -- Array of tags
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- AI Conversations Table
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  messages JSONB NOT NULL, -- Array of message objects with role and content
  title TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Goals Table
CREATE TABLE goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  type TEXT NOT NULL, -- weight, workout_frequency, water_intake, sleep, etc.
  target_value DECIMAL(10,2) NOT NULL,
  current_value DECIMAL(10,2) DEFAULT 0,
  unit TEXT,
  target_date DATE,
  achieved BOOLEAN DEFAULT FALSE,
  achieved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Exercise Library Table
CREATE TABLE exercise_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- strength, cardio, flexibility, etc.
  muscle_groups TEXT[], -- Array of muscle groups
  equipment TEXT[], -- Array of equipment needed
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  instructions TEXT,
  tips TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- User Exercise Progress Table
CREATE TABLE user_exercise_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  exercise_id UUID REFERENCES exercise_library(id) NOT NULL,
  workout_session_id UUID REFERENCES workout_sessions(id),
  sets INTEGER,
  reps INTEGER,
  weight DECIMAL(6,2), -- in kg
  duration INTEGER, -- in seconds for time-based exercises
  distance DECIMAL(8,2), -- in meters
  rest_time INTEGER, -- in seconds
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_daily_stats_user_id_date ON daily_stats(user_id, date);
CREATE INDEX idx_workout_sessions_user_id ON workout_sessions(user_id);
CREATE INDEX idx_workout_sessions_started_at ON workout_sessions(started_at);
CREATE INDEX idx_food_entries_user_id_date ON food_entries(user_id, date);
CREATE INDEX idx_journal_entries_user_id_date ON journal_entries(user_id, date);
CREATE INDEX idx_ai_conversations_user_id ON ai_conversations(user_id);
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_user_exercise_progress_user_id ON user_exercise_progress(user_id);
CREATE INDEX idx_user_exercise_progress_exercise_id ON user_exercise_progress(exercise_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_daily_stats_updated_at BEFORE UPDATE ON daily_stats FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_workout_sessions_updated_at BEFORE UPDATE ON workout_sessions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_food_entries_updated_at BEFORE UPDATE ON food_entries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_journal_entries_updated_at BEFORE UPDATE ON journal_entries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_ai_conversations_updated_at BEFORE UPDATE ON ai_conversations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON goals FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercise_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- User Profiles policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profile" ON user_profiles FOR DELETE USING (auth.uid() = user_id);

-- Daily Stats policies
CREATE POLICY "Users can view own daily stats" ON daily_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own daily stats" ON daily_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily stats" ON daily_stats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own daily stats" ON daily_stats FOR DELETE USING (auth.uid() = user_id);

-- Workout Sessions policies
CREATE POLICY "Users can view own workouts" ON workout_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workouts" ON workout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workouts" ON workout_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workouts" ON workout_sessions FOR DELETE USING (auth.uid() = user_id);

-- Food Entries policies
CREATE POLICY "Users can view own food entries" ON food_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own food entries" ON food_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food entries" ON food_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food entries" ON food_entries FOR DELETE USING (auth.uid() = user_id);

-- Journal Entries policies
CREATE POLICY "Users can view own journal entries" ON journal_entries FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own journal entries" ON journal_entries FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own journal entries" ON journal_entries FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own journal entries" ON journal_entries FOR DELETE USING (auth.uid() = user_id);

-- AI Conversations policies
CREATE POLICY "Users can view own conversations" ON ai_conversations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own conversations" ON ai_conversations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own conversations" ON ai_conversations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own conversations" ON ai_conversations FOR DELETE USING (auth.uid() = user_id);

-- Goals policies
CREATE POLICY "Users can view own goals" ON goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON goals FOR DELETE USING (auth.uid() = user_id);

-- User Exercise Progress policies
CREATE POLICY "Users can view own exercise progress" ON user_exercise_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own exercise progress" ON user_exercise_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own exercise progress" ON user_exercise_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own exercise progress" ON user_exercise_progress FOR DELETE USING (auth.uid() = user_id);

-- Exercise Library policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view exercise library" ON exercise_library FOR SELECT TO authenticated USING (true);

-- Insert some basic exercises into the exercise library
INSERT INTO exercise_library (name, category, muscle_groups, equipment, difficulty_level, instructions, tips) VALUES
  ('Push-ups', 'strength', ARRAY['chest', 'shoulders', 'triceps'], ARRAY['bodyweight'], 'beginner', 'Start in plank position, lower body until chest nearly touches ground, push back up.', 'Keep core tight and body straight throughout the movement.'),
  ('Squats', 'strength', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 'Stand with feet shoulder-width apart, lower body as if sitting back into a chair, return to standing.', 'Keep knees in line with toes and chest up.'),
  ('Plank', 'strength', ARRAY['core', 'shoulders'], ARRAY['bodyweight'], 'beginner', 'Hold body in straight line from head to heels, supported on forearms and toes.', 'Engage core and breathe normally throughout the hold.'),
  ('Lunges', 'strength', ARRAY['quadriceps', 'glutes', 'hamstrings'], ARRAY['bodyweight'], 'beginner', 'Step forward with one leg, lowering hips until both knees are bent at 90 degrees.', 'Keep front knee over ankle and back straight.'),
  ('Burpees', 'cardio', ARRAY['full_body'], ARRAY['bodyweight'], 'intermediate', 'Squat down, jump back to plank, do push-up, jump feet to squat, jump up with arms overhead.', 'Move quickly but maintain good form throughout each component.'),
  ('Mountain Climbers', 'cardio', ARRAY['core', 'shoulders', 'legs'], ARRAY['bodyweight'], 'intermediate', 'Start in plank position, alternate bringing knees to chest in running motion.', 'Keep hips level and core engaged throughout the movement.'),
  ('Jumping Jacks', 'cardio', ARRAY['full_body'], ARRAY['bodyweight'], 'beginner', 'Jump feet apart while raising arms overhead, then jump back to starting position.', 'Land softly and maintain rhythm throughout the exercise.'),
  ('Deadlifts', 'strength', ARRAY['hamstrings', 'glutes', 'back'], ARRAY['barbell', 'dumbbells'], 'intermediate', 'Stand with feet hip-width apart, hinge at hips to lower weight, drive hips forward to return to standing.', 'Keep back straight and weight close to body throughout the movement.'),
  ('Bench Press', 'strength', ARRAY['chest', 'shoulders', 'triceps'], ARRAY['barbell', 'bench'], 'intermediate', 'Lie on bench, lower barbell to chest, press back up to starting position.', 'Keep feet firmly planted and maintain slight arch in back.'),
  ('Pull-ups', 'strength', ARRAY['back', 'biceps'], ARRAY['pull_up_bar'], 'intermediate', 'Hang from bar with palms facing away, pull body up until chin clears bar, lower with control.', 'Engage core and avoid swinging or kipping.');
