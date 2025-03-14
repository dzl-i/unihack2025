import { Button } from "@/components/ui/button"
import { LockIcon } from "lucide-react"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <main className="min-h-screen bg-landing-page flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="bg-primary rounded-md p-1">
            <LockIcon className="h-4 w-4 text-white" />
          </div>
          <span className="text-xs text-white font-medium">Jappy</span>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="bg-purple-gradient text-white text-xs h-7 px-4 rounded">
            Login
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs h-7 px-4 rounded border-gray-700 bg-transparent text-white"
          >
            Register
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 purple-gradient">
        <div className="max-w-md mx-auto mb-12">
          <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <LockIcon className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Your Notes, Now Answering Back</h1>
          <p className="text-sm text-gray-400 mb-6">
            Upload your documents, ask questions, and get answers. AI-powered insights with perfect context. All
            completely private.
          </p>
          <Button className="bg-purple-gradient hover:bg-primary/90 text-white rounded w-full">Get Started</Button>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-medium text-white mb-6">Key Features</h2>
          <h3 className="text-xl font-bold text-white mb-8">Tools Designed With You In Mind</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeatureCard
              icon="📄"
              title="Bring All Your Stuff - We'll Handle It"
              description="Upload documents, PDFs, images, or presentations. We'll organize and make them searchable, so you can find what you need when you need it."
            />
            <FeatureCard
              icon="📝"
              title="Your Documents Have the Answers"
              description="Ask questions about your documents and get accurate answers extracted directly from your content, with citations to the original source."
            />
            <FeatureCard
              icon="🔍"
              title="Share What You Know"
              description="Knowledge grows when shared. Create collections of documents and insights that you can share with your team or keep private."
            />
            <FeatureCard
              icon="👁️"
              title="See How Everything Connects"
              description="Visualize connections between your documents to discover relationships and insights you might have missed."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 text-center purple-gradient">
        <div className="max-w-md mx-auto">
          <div className="bg-primary/20 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <LockIcon className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Get Started Now</h2>
          <p className="text-sm text-gray-400 mb-6">
            Sign up and create a workspace in seconds. Simply upload your documents, ask questions, and get answers
            right away.
          </p>
          <Button className="bg-purple-gradient hover:bg-primary/90 text-white rounded">Get Started</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-4 text-center text-xs text-gray-500 border-t border-gray-800">
        <p>Copyright © 2025, Jappy</p>
      </footer>
    </main>
  )
}

