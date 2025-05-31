import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { CheckCircle, Clock, Flame, Plus, Target, X } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in minutes for cardio exercises
  rest?: number; // rest time in seconds
  completed: boolean;
}

interface WorkoutLoggerProps {
  onClose?: () => void;
  onSave?: (workout: any) => void;
}

export default function WorkoutLogger({ onClose, onSave }: WorkoutLoggerProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("strength");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: 3,
    reps: 10,
    weight: 0,
    duration: 0,
    rest: 60,
  });

  const workoutTypes = [
    { id: "strength", label: "Strength Training", icon: "💪" },
    { id: "cardio", label: "Cardio", icon: "🏃" },
    { id: "flexibility", label: "Flexibility", icon: "🧘" },
    { id: "sports", label: "Sports", icon: "⚽" },
    { id: "other", label: "Other", icon: "🏋️" },
  ];

  const popularExercises = {
    strength: ["Push-ups", "Squats", "Deadlifts", "Bench Press", "Pull-ups", "Lunges"],
    cardio: ["Running", "Cycling", "Rowing", "Jumping Jacks", "Burpees", "Mountain Climbers"],
    flexibility: ["Stretching", "Yoga Flow", "Pilates", "Foam Rolling"],
    sports: ["Basketball", "Soccer", "Tennis", "Swimming", "Rock Climbing"],
    other: ["Walking", "Dancing", "Hiking", "Skateboarding"],
  };

  const addExercise = () => {
    if (!newExercise.name.trim()) return;

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: newExercise.name,
      sets: newExercise.sets,
      reps: newExercise.reps,
      weight: workoutType === "strength" ? newExercise.weight : undefined,
      duration: workoutType === "cardio" ? newExercise.duration : undefined,
      rest: newExercise.rest,
      completed: false,
    };

    setExercises((prev) => [...prev, exercise]);
    setNewExercise({
      name: "",
      sets: 3,
      reps: 10,
      weight: 0,
      duration: 0,
      rest: 60,
    });
    setIsAddingExercise(false);
  };

  const removeExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  };

  const toggleExerciseComplete = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  const saveWorkout = () => {
    if (!workoutName.trim() || exercises.length === 0) return;

    const workout = {
      name: workoutName,
      type: workoutType,
      exercises,
      duration: exercises.reduce((total, ex) => total + (ex.duration || 0), 0),
      completed: exercises.every((ex) => ex.completed),
      createdAt: new Date(),
    };

    onSave?.(workout);
    onClose?.();
  };

  const totalTime = exercises.reduce((total, ex) => {
    const exerciseTime = ex.duration || ex.sets * 2; // Estimate 2 min per set for strength
    const restTime = (ex.sets * (ex.rest || 60)) / 60; // Convert rest to minutes
    return total + exerciseTime + restTime;
  }, 0);

  const completedExercises = exercises.filter((ex) => ex.completed).length;

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="p-4 border-b border-border bg-card">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-semibold">Log Workout</Text>
          {onClose && (
            <Button size="sm" variant="ghost" onPress={onClose}>
              <X size={16} color={iconColor} />
            </Button>
          )}
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* Workout Details */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-2">Workout Name</Text>
          <TextInput
            value={workoutName}
            onChangeText={setWorkoutName}
            placeholder="e.g., Morning Strength Training"
            className="border border-border rounded-lg p-3 bg-background text-foreground"
            style={{ color: iconColor }}
            placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
          />
        </View>

        {/* Workout Type */}
        <View className="mb-6">
          <Text className="text-sm font-medium mb-3">Workout Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
            <View className="flex-row space-x-2">
              {workoutTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={workoutType === type.id ? "default" : "outline"}
                  size="sm"
                  onPress={() => setWorkoutType(type.id)}
                >
                  <Text>
                    {type.icon} {type.label}
                  </Text>
                </Button>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Workout Stats */}
        {exercises.length > 0 && (
          <View className="mb-6">
            <View className="bg-card rounded-lg p-4 border border-border">
              <View className="flex-row justify-between mb-2">
                <View className="items-center">
                  <Target size={16} color={iconColor} />
                  <Text className="text-xs text-muted-foreground mt-1">Exercises</Text>
                  <Text className="font-semibold">{exercises.length}</Text>
                </View>
                <View className="items-center">
                  <CheckCircle size={16} color="#10b981" />
                  <Text className="text-xs text-muted-foreground mt-1">Completed</Text>
                  <Text className="font-semibold">
                    {completedExercises}/{exercises.length}
                  </Text>
                </View>
                <View className="items-center">
                  <Clock size={16} color={iconColor} />
                  <Text className="text-xs text-muted-foreground mt-1">Est. Time</Text>
                  <Text className="font-semibold">{Math.round(totalTime)}m</Text>
                </View>
                <View className="items-center">
                  <Flame size={16} color="#f59e0b" />
                  <Text className="text-xs text-muted-foreground mt-1">Calories</Text>
                  <Text className="font-semibold">~{Math.round(totalTime * 5)}</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Exercises List */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-medium">Exercises</Text>
            <Button size="sm" variant="outline" onPress={() => setIsAddingExercise(true)}>
              <Plus size={14} color={iconColor} />
              <Text className="ml-1">Add Exercise</Text>
            </Button>
          </View>

          {exercises.map((exercise, index) => (
            <View key={exercise.id} className="bg-card rounded-lg p-4 border border-border mb-3">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-medium flex-1">{exercise.name}</Text>
                <View className="flex-row items-center space-x-2">
                  <Button
                    size="sm"
                    variant={exercise.completed ? "default" : "outline"}
                    onPress={() => toggleExerciseComplete(exercise.id)}
                  >
                    <CheckCircle size={14} color={exercise.completed ? "#ffffff" : iconColor} />
                  </Button>
                  <Button size="sm" variant="ghost" onPress={() => removeExercise(exercise.id)}>
                    <X size={14} color={iconColor} />
                  </Button>
                </View>
              </View>
              <View className="flex-row space-x-4">
                <Text className="text-sm text-muted-foreground">
                  {exercise.sets} sets × {exercise.reps} reps
                </Text>
                {exercise.weight && (
                  <Text className="text-sm text-muted-foreground">{exercise.weight} kg</Text>
                )}
                {exercise.duration && (
                  <Text className="text-sm text-muted-foreground">{exercise.duration} min</Text>
                )}
              </View>
            </View>
          ))}

          {exercises.length === 0 && (
            <View className="bg-card rounded-lg p-6 border border-border text-center">
              <Text className="text-muted-foreground mb-2">No exercises added yet</Text>
              <Text className="text-sm text-muted-foreground">
                Add exercises to start building your workout
              </Text>
            </View>
          )}
        </View>

        {/* Add Exercise Form */}
        {isAddingExercise && (
          <View className="mb-6 bg-card rounded-lg p-4 border border-border">
            <Text className="text-sm font-medium mb-3">Add Exercise</Text>

            <View className="mb-3">
              <Text className="text-xs text-muted-foreground mb-2">Exercise Name</Text>
              <TextInput
                value={newExercise.name}
                onChangeText={(text) => setNewExercise((prev) => ({ ...prev, name: text }))}
                placeholder="Enter exercise name"
                className="border border-border rounded-lg p-2 bg-background text-foreground"
                style={{ color: iconColor }}
                placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
              />
            </View>

            {/* Popular Exercises */}
            {popularExercises[workoutType as keyof typeof popularExercises] && (
              <View className="mb-3">
                <Text className="text-xs text-muted-foreground mb-2">Popular Exercises</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row space-x-2">
                    {popularExercises[workoutType as keyof typeof popularExercises].map(
                      (exercise) => (
                        <Button
                          key={exercise}
                          size="sm"
                          variant="outline"
                          onPress={() =>
                            setNewExercise((prev) => ({
                              ...prev,
                              name: exercise,
                            }))
                          }
                        >
                          <Text>{exercise}</Text>
                        </Button>
                      )
                    )}
                  </View>
                </ScrollView>
              </View>
            )}

            <View className="flex-row space-x-3 mb-3">
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Sets</Text>
                <TextInput
                  value={newExercise.sets.toString()}
                  onChangeText={(text) =>
                    setNewExercise((prev) => ({
                      ...prev,
                      sets: Number.parseInt(text) || 0,
                    }))
                  }
                  keyboardType="numeric"
                  className="border border-border rounded-lg p-2 bg-background text-foreground text-center"
                  style={{ color: iconColor }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground mb-1">Reps</Text>
                <TextInput
                  value={newExercise.reps.toString()}
                  onChangeText={(text) =>
                    setNewExercise((prev) => ({
                      ...prev,
                      reps: Number.parseInt(text) || 0,
                    }))
                  }
                  keyboardType="numeric"
                  className="border border-border rounded-lg p-2 bg-background text-foreground text-center"
                  style={{ color: iconColor }}
                />
              </View>
              {workoutType === "strength" && (
                <View className="flex-1">
                  <Text className="text-xs text-muted-foreground mb-1">Weight (kg)</Text>
                  <TextInput
                    value={newExercise.weight.toString()}
                    onChangeText={(text) =>
                      setNewExercise((prev) => ({
                        ...prev,
                        weight: Number.parseFloat(text) || 0,
                      }))
                    }
                    keyboardType="numeric"
                    className="border border-border rounded-lg p-2 bg-background text-foreground text-center"
                    style={{ color: iconColor }}
                  />
                </View>
              )}
              {workoutType === "cardio" && (
                <View className="flex-1">
                  <Text className="text-xs text-muted-foreground mb-1">Duration (min)</Text>
                  <TextInput
                    value={newExercise.duration.toString()}
                    onChangeText={(text) =>
                      setNewExercise((prev) => ({
                        ...prev,
                        duration: Number.parseInt(text) || 0,
                      }))
                    }
                    keyboardType="numeric"
                    className="border border-border rounded-lg p-2 bg-background text-foreground text-center"
                    style={{ color: iconColor }}
                  />
                </View>
              )}
            </View>

            <View className="flex-row space-x-2">
              <Button
                variant="outline"
                size="sm"
                onPress={() => setIsAddingExercise(false)}
                className="flex-1"
              >
                <Text>Cancel</Text>
              </Button>
              <Button
                size="sm"
                onPress={addExercise}
                disabled={!newExercise.name.trim()}
                className="flex-1"
              >
                <Text className="text-white">Add Exercise</Text>
              </Button>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Save Button */}
      <View className="p-4 border-t border-border bg-card">
        <Button
          onPress={saveWorkout}
          disabled={!workoutName.trim() || exercises.length === 0}
          size="lg"
          className="w-full"
        >
          <Text className="text-white font-semibold">Save Workout</Text>
        </Button>
      </View>
    </View>
  );
}
