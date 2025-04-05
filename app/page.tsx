import Link from "next/link"
import { MoonStar, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DreamList } from "@/components/dream-list"
import { DreamStats } from "@/components/dream-stats"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MoonStar className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold">Dream Journal</h1>
        </div>
        <Link href="/new">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            New Dream
          </Button>
        </Link>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <DreamList />
        </div>
        <div>
          <DreamStats />
        </div>
      </div>
    </div>
  )
}

