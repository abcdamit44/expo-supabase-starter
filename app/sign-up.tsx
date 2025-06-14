import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import * as z from "zod";

import { Logo } from "@/components/logo";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { useAuth } from "@/context/supabase-provider";

const formSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Please enter a valid email address."),
    password: z
      .string()
      .min(8, "Please enter at least 8 characters.")
      .max(64, "Please enter fewer than 64 characters.")
      .regex(/^(?=.*[a-z])/, "Your password must have at least one lowercase letter.")
      .regex(/^(?=.*[A-Z])/, "Your password must have at least one uppercase letter.")
      .regex(/^(?=.*[0-9])/, "Your password must have at least one number.")
      .regex(/^(?=.*[!@#$%^&*])/, "Your password must have at least one special character."),
    confirmPassword: z.string().min(8, "Please enter at least 8 characters."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Your passwords do not match.",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const { signUp } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await signUp(data.email, data.password, data.name);
      form.reset();
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof Error) {
        if (error.message.includes("Network request failed")) {
          errorMessage =
            "Network connection failed. Please check your internet connection and try again.";
        } else if (error.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please try again.";
        } else if (error.message.includes("User already registered")) {
          errorMessage =
            "An account with this email already exists. Please try signing in instead.";
        } else {
          errorMessage = error.message;
        }
      }

      console.error("Sign up error:", errorMessage);

      // Set form error to display to user
      form.setError("root", {
        type: "manual",
        message: errorMessage,
      });
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background p-4" edges={["bottom"]}>
      <View className="flex-1 gap-4 web:m-4">
        <View className="items-center mb-6">
          <Logo size={60} />
        </View>
        <H1 className="self-start">Sign Up</H1>

        {form.formState.errors.root && (
          <View className="bg-destructive/10 border border-destructive rounded-md p-3">
            <Text className="text-destructive text-sm">{form.formState.errors.root.message}</Text>
          </View>
        )}

        <Form {...form}>
          <View className="gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect={false}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  label="Email"
                  placeholder="Email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput
                  label="Password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormInput
                  label="Confirm Password"
                  placeholder="Confirm password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  {...field}
                />
              )}
            />
          </View>
        </Form>
      </View>
      <Button
        size="default"
        variant="default"
        onPress={form.handleSubmit(onSubmit)}
        disabled={form.formState.isSubmitting}
        className="web:m-4"
      >
        {form.formState.isSubmitting ? <ActivityIndicator size="small" /> : <Text>Sign Up</Text>}
      </Button>
    </SafeAreaView>
  );
}
