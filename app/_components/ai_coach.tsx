import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { Bot, MessageCircle, Send, User } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AICoachProps {
  onClose?: () => void;
}

export default function AICoach({ onClose }: AICoachProps) {
  const { colorScheme } = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const scrollViewRef = useRef<ScrollView>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! I'm your AI Health Coach 🤖💪 I'm here to help you with workouts, nutrition advice, motivation, and answering any health-related questions. What would you like to work on today?",
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = [
    "Create a beginner workout plan",
    "Help me lose weight",
    "Suggest healthy meal ideas",
    "Motivate me to exercise",
    "Track my progress",
  ];

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response (In real app, this would call an AI API)
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your fitness goals, I recommend...",
        "I understand what you're looking for. Here's my suggestion...",
        "Excellent! Let's work on that together. Here's what I think...",
        "That's awesome that you're focusing on this. My advice would be...",
        "I can definitely help with that! Here's a personalized approach...",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `${randomResponse} However, this is just a demo response. In the full app, I would provide personalized advice based on your profile and goals!`,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputText(prompt);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      {/* Header */}
      <View className="p-4 border-b border-border bg-card">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Bot size={24} color={iconColor} />
            <Text className="ml-2 text-lg font-semibold">AI Health Coach</Text>
          </View>
          {onClose && (
            <Button size="sm" variant="ghost" onPress={onClose}>
              <Text>Close</Text>
            </Button>
          )}
        </View>
        <Text className="text-sm text-muted-foreground mt-1">
          Your personal AI fitness and wellness assistant
        </Text>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 p-4"
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            className={`mb-4 ${message.role === "user" ? "items-end" : "items-start"}`}
          >
            <View className="flex-row items-start max-w-[80%]">
              {message.role === "assistant" && (
                <View className="mr-2 mt-1">
                  <Bot size={16} color="#10b981" />
                </View>
              )}
              <View
                className={`rounded-xl p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                }`}
              >
                <Text className={message.role === "user" ? "text-white" : "text-foreground"}>
                  {message.content}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
              </View>
              {message.role === "user" && (
                <View className="ml-2 mt-1">
                  <User size={16} color={iconColor} />
                </View>
              )}
            </View>
          </View>
        ))}

        {isLoading && (
          <View className="items-start mb-4">
            <View className="flex-row items-start max-w-[80%]">
              <View className="mr-2 mt-1">
                <Bot size={16} color="#10b981" />
              </View>
              <View className="bg-card border border-border rounded-xl p-3">
                <Text className="text-muted-foreground">AI Coach is typing...</Text>
              </View>
            </View>
          </View>
        )}

        {/* Suggested Prompts */}
        {messages.length === 1 && (
          <View className="mt-4">
            <Text className="text-sm font-medium mb-3 text-muted-foreground">
              Try asking me about:
            </Text>
            <View className="space-y-2">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onPress={() => handleSuggestedPrompt(prompt)}
                  className="justify-start"
                >
                  <MessageCircle size={14} color={iconColor} />
                  <Text className="ml-2">{prompt}</Text>
                </Button>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View className="p-4 border-t border-border bg-card">
        <View className="flex-row items-end space-x-2">
          <View className="flex-1 border border-border rounded-xl bg-background">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about fitness, nutrition, or wellness..."
              placeholderTextColor={colorScheme === "dark" ? "#9ca3af" : "#6b7280"}
              multiline
              maxLength={500}
              className="p-3 text-foreground max-h-20"
              style={{ color: iconColor }}
              returnKeyType="send"
              onSubmitEditing={sendMessage}
              blurOnSubmit={false}
            />
          </View>
          <Button
            onPress={sendMessage}
            disabled={!inputText.trim() || isLoading}
            size="sm"
            className="aspect-square"
          >
            <Send size={16} color="#ffffff" />
          </Button>
        </View>
        <Text className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are for informational purposes. Consult professionals for medical advice.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
