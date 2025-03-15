"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { request } from "@/hooks/useRequest";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignupForm() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError("");

    try {
      // Preparing the payload matching what backend expects
      const payload = {
        ...values,
        username: values.email.split("@")[0], // Simple username from email
        profilePic: "", // Default profile pic will be set by backend
      };

      const { data, error } = await request("POST", "/auth/register", payload);

      if (error) {
        setError(error);
      } else if (data) {
        // Set user in auth context
        setUser({
          userId: data.userId,
          name: data.name,
          email: data.email,
          profilePic: data.profilePic,
        });

        // Redirect to chat page after successful registration
        router.push("/chat");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-10">
        <h3 className="text-3xl font-medium mb-4">
          Let&apos;s get <i className="font-light">you</i> started
        </h3>
        <p className="text-sm font-light text-muted-foreground">
          Create an account and start making notes with friends
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 text-red-500 text-sm">
          {error}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name..."
                    className="font-light h-12 rounded-xl p-4"
                    {...field}
                    variant="transparent"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email..."
                    className="font-light h-12 rounded-xl p-4"
                    {...field}
                    variant="transparent"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password..."
                    className="font-light h-12 rounded-xl p-4"
                    {...field}
                    variant="transparent"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-[2px] mt-10">
            <Button
              type="submit"
              className="w-full bg-purple-gradient-right hover:bg-primary/90 flex items-center justify-center h-11 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              <p className="font-semibold mt-[3px]">
                {isLoading ? "Signing up..." : "Sign up"}
              </p>
              {!isLoading && <ArrowRight size={28} />}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
