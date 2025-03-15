"use client";

import Image from "next/image";
import { BarChart, MessageSquareTextIcon, Upload, Users } from "lucide-react";
import { useRef } from "react";
import StarGrid from "./StarGrid";
import Logo from "../logo";
import { useIsVisible } from "@/hooks/useIsVisible";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  const ref1 = useRef(null);
  const isVisible1 = useIsVisible(ref1);
  const ref2 = useRef(null);
  const isVisible2 = useIsVisible(ref2);
  const ref3 = useRef(null);
  const isVisible3 = useIsVisible(ref3);

  return (
    <>
      {/* Navbar */}
      <nav className="flex items-center justify-between p-8">
        <div className="flex items-center gap-2">
          <Logo width={32} height={32} />
          <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/75">
            CollabAI
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="border-foreground/15"
            variant="default"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            className="border-foreground/15"
            variant="ghost"
            onClick={() => router.push("/signup")}
          >
            Register
          </Button>
        </div>
      </nav>
      <StarGrid />
      {/* Main page */}
      <main className="space-y-20 text-center">
        <div
          ref={ref1}
          className={`space-y-12 my-40 mx-auto transition-opacity duration-700 relative ease-in ${
            isVisible1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-6 max-w-[640px] px-4 mx-auto">
            <div className="bg-purple-gradient shadow-purple-gradient inline-block p-3 rounded-lg">
              <Logo width={48} height={48} />
            </div>
            <h1 className="text-5xl font-bold">
              Your Notes, Now Answering Back
            </h1>
            <p className="text-xl opacity-50">
              Upload your papers and notes. Ask questions. Get insights with
              proper citations. All powered by AI
            </p>
          </div>

          <div className="before:from-bg-white/5 shadow-white-gradient before:to-bg-white/0 relative mx-auto block w-[75%] before:absolute before:-inset-2 before:-z-10 before:rounded-lg before:border before:border-white/20 before:bg-gradient-to-br before:backdrop-blur-md">
            <Image
              className="inline-block rounded-md"
              src="/landing.png"
              width={1600}
              height={1600}
              alt="Landing page preview"
            />
          </div>
        </div>
        <div
          ref={ref2}
          className={`space-y-3 my-52 transition-opacity duration-700 ease-in ${
            isVisible2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-4">
            <span className="px-4 py-2 rounded-full border border-foreground/15 inline-block">
              Key Features
            </span>
            <h2 className="mx-auto block w-[85%] text-4xl font-semibold">
              Tools Designed With You In Mind
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 max-w-5xl mx-auto p-8">
            <div className="relative col-span-1 md:col-span-6 space-y-2 bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/15 p-6 text-left rounded-xl transition-colors duration-500 after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-purple-4 after:bg-opacity-0 after:blur-lg after:transition-all after:hover:bg-opacity-5">
              <div className="flex gap-2">
                <Upload className="mx-auto block size-12 bg-purple-gradient p-3 rounded-xl shadow-purple-gradient" />
                <h3 className="text-lg font-bold flex-grow">
                  Bring All Your Stuff - We’ll Handle It
                </h3>
              </div>
              <p className="text-sm opacity-50">
                No matter what format your knowledge lives in – PDFs, diagrams,
                or presentations – simply upload and let our smart system
                organize everything. We'll index it all so you can find exactly
                what you need when you need it
              </p>
            </div>
            <div className="relative col-span-1 md:col-span-4 space-y-2 max-w-4xl bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/15 p-6 text-left rounded-xl transition-colors duration-500 after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-purple-4 after:bg-opacity-0 after:blur-lg after:transition-all after:hover:bg-opacity-5">
              <div className="flex gap-2">
                <MessageSquareTextIcon className="mx-auto block size-12 bg-purple-gradient p-3 rounded-xl shadow-purple-gradient" />
                <h3 className="text-lg font-bold flex-grow">
                  Your Documents Have the Answers
                </h3>
              </div>
              <p className="text-sm opacity-50">
                Have a burning question? Just ask. Our AI searches across all
                your materials to deliver precise answers with direct citations
                to your sources. No more digging through folders or scrolling
                through pages
              </p>
            </div>
            <div className="relative col-span-1 md:col-span-4 space-y-2 bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/15 p-6 text-left rounded-xl transition-colors duration-500 after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-purple-4 after:bg-opacity-0 after:blur-lg after:transition-all after:hover:bg-opacity-5">
              <div className="flex gap-2">
                <Users className="mx-auto block size-12 bg-purple-gradient p-3 rounded-xl shadow-purple-gradient" />
                <h3 className="text-lg font-bold flex-grow">
                  Share What You Know
                </h3>
              </div>
              <p className="text-sm opacity-50">
                Knowledge grows when shared. Invite teammates, classmates, or
                supervisors to collaborate on projects, building a collective
                intelligence that benefits everyone. Learn together, solve
                together
              </p>
            </div>
            <div className="relative col-span-1 md:col-span-6 space-y-2 bg-gradient-to-br from-foreground/5 to-foreground/0 border border-foreground/15 p-6 text-left rounded-xl transition-colors duration-500 after:absolute after:inset-0 after:-z-10 after:animate-pulse after:rounded-full after:bg-purple-4 after:bg-opacity-0 after:blur-lg after:transition-all after:hover:bg-opacity-5">
              <div className="flex gap-2">
                <BarChart className="mx-auto block size-12 bg-purple-gradient p-3 rounded-xl shadow-purple-gradient" />
                <h3 className="text-lg font-bold flex-grow">
                  See How Everything Connects
                </h3>
              </div>
              <p className="text-sm opacity-50">
                Uncover relationships you never knew existed. Our visualization
                tools map connections between your documents and concepts,
                helping you spot patterns, generate new ideas, and make
                breakthrough connections
              </p>
            </div>
          </div>
        </div>
        <div
          ref={ref3}
          className={`relative space-y-20 h-[720px] md:m-12 m-8 flex justify-center items-center p-8 rounded-lg border broder-foreground/15 bg-foreground/5 text-center transition-opacity duration-700 ease-in ${
            isVisible3 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="space-y-6 m-auto max-w-xl">
            <div className="bg-purple-gradient shadow-purple-gradient inline-block p-3 rounded-lg">
              <Logo width={48} height={48} />
            </div>
            <h1 className="text-4xl font-semibold">Get Started Now!</h1>
            <p className="opacity-50">
              Begin your journey in minutes, not days. Simply upload your
              documents, ask your first question, and watch as your information
              transforms into an interactive knowledge hub.
            </p>
            <Button variant="default">Get Started</Button>
          </div>
          <div className="glow absolute left-1/2 top-1/2 -z-10 aspect-square w-full max-w-sm -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-purple-800/35 blur-3xl filter transition-all"></div>
        </div>
        <footer className="border border-b-transparent border-l-transparent border-r-transparent border-t-white/10 p-12 py-8">
          <span className="text-sm font-light opacity-50">
            Copyright © 2025. Unempluzz (Unemployed Huzz)
          </span>
        </footer>
      </main>
    </>
  );
}
