import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Logo from "@/components/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grid grid-cols-2 h-screen p-12">
        {/* Left Column - Login Form */}
        <div className="flex flex-col items-center justify-center p-6">
          <div className="flex items-center gap-1 mb-6">
            <Logo width={24} height={24} />
            <span className="text-xl font-medium">Jappy</span>
          </div>

          <div className="w-full max-w-md bg-muted rounded-lg p-6 border border-gray-800">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold">Welcome to</h1>
              <h2 className="text-2xl font-bold">Jappy</h2>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Glad to see you again</h3>
              <p className="text-sm text-gray-400 mb-6">Login to your account to continue</p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-gray-400">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email..."
                  className="bg-secondary border-gray-700"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-400">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password..."
                  className="bg-secondary border-gray-700"
                />
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">Login</Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
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