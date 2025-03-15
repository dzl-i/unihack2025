"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

// Define the form schema with Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export default function LoginPage() {
  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Handle login logic here
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="grid grid-cols-2 h-screen p-20">
        {/* Left Column - Login Form */}
        <div className="flex flex-col pr-20">
          <Link href="/" className="flex items-center gap-2 mb-10 hover:opacity-90 transition-opacity">
            <div className="gap-3 flex items-center">
              <ArrowLeft size={20} />
              <Logo width={24} height={24} />
            </div>
            <span className="text-xl font-semibold">Jappy</span>
          </Link>

          <div className="flex-1 flex flex-col justify-center mb-10">
            <div className="mb-10">
              <h3 className="text-3xl font-medium mb-4">Glad to see <i className="font-light">you</i> again</h3>
              <p className="text-sm font-light text-muted-foreground">Login to your account to continue</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="p-[2px] mt-10">
                  <Button type="submit" className="w-full bg-purple-gradient hover:bg-primary/90 flex items-center justify-center h-11 rounded-xl cursor-pointer hover:opacity-90 transition-opacity">
                    <p className="font-semibold mt-[3px]">Login</p>
                    <ArrowRight size={28} />
                  </Button>
                </div>
              </form>
            </Form>

            <div className="mt-6 flex items-center justify-center">
              <p className="text-sm text-muted-foreground font-light">
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#FFFFFFBF] hover:underline hover:opacity-90 transition-opacity">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Red Square Placeholder */}
        <div className="bg-red-500 w-full h-full flex items-center justify-center">
          <p className="text-white text-2xl font-bold">Placeholder</p>
        </div>
      </main>
    </div>
  )
}