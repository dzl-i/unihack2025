import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LockIcon } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4">
        <div className="flex items-center gap-1">
          <div className="bg-primary rounded-md p-1">
            <LockIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white font-medium">AppNotes</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 purple-gradient">
        <div className="w-full max-w-md bg-muted rounded-lg p-6 border border-gray-800">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white">Welcome to</h1>
            <h2 className="text-2xl font-bold text-white">AppNotes</h2>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Let's get you started</h3>
            <p className="text-sm text-gray-400 mb-6">Create an account to continue</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm text-gray-400">
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="bg-secondary border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-400">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-secondary border-gray-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-400">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                className="bg-secondary border-gray-700 text-white"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90 text-white">Create Your Account</Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

