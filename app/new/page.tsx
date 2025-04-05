import { MoonStar } from "lucide-react"
import Link from "next/link"

import { DreamForm } from "@/components/dream-form"

export default function NewDreamPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <MoonStar className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold">Dream Journal</h1>
        </Link>
      </header>

      <div className="mx-auto max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold">Record New Dream</h2>
        <DreamForm />
      </div>
    </div>
  )
}

