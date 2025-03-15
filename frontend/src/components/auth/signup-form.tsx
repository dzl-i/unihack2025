"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

export function SignupForm() {
  // Initialize form with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
    <>
      <div className="mb-10">
        <h3 className="text-3xl font-medium mb-4">Let's get <i className="font-light">you</i> started</h3>
        <p className="text-sm font-light text-muted-foreground">Create an account and start making notes with friends</p>
      </div>

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
              <p className="font-semibold mt-[3px]">Sign up</p>
              <ArrowRight size={28} />
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}