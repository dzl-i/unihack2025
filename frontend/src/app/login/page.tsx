"use client";

import { LoginHeader } from "@/components/auth/login-header";
import { LoginForm } from "@/components/auth/login-form";
import { LoginFormFooter } from "@/components/auth/login-form-footer";
import { LoginSideBanner } from "@/components/auth/login-side-banner";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="grid grid-cols-2 h-screen p-20">
        {/* Left Column - Login Form */}
        <div className="flex flex-col pr-20">
          <LoginHeader />

          <div className="flex-1 flex flex-col justify-center mb-10">
            <LoginForm />
            <LoginFormFooter />
          </div>
        </div>

        {/* Right Column - Banner */}
        <LoginSideBanner />
      </main>
    </div>
  );
}
