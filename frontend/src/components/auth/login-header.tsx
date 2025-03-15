import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Logo from "@/components/logo"

export function LoginHeader() {
  return (
    <Link href="/" className="flex items-center gap-2 mb-10 hover:opacity-90 transition-opacity">
      <div className="gap-3 flex items-center">
        <ArrowLeft size={20} />
        <Logo width={24} height={24} />
      </div>
      <span className="text-xl font-semibold">Jappy</span>
    </Link>
  )
}