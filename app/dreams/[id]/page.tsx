import { ArrowLeft, Calendar, Clock, MoonStar } from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShareDream } from "@/components/share-dream"
import { getDream } from "@/lib/dreams"

export default function DreamPage({ params }: { params: { id: string } }) {
  const dream = getDream(params.id)

  if (!dream) {
    return (
      <div className="container mx-auto flex h-[70vh] flex-col items-center justify-center px-4 py-8">
        <h2 className="mb-4 text-xl font-semibold">Dream not found</h2>
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Journal
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <Link href="/" className="flex items-center gap-2">
          <MoonStar className="h-6 w-6 text-purple-500" />
          <h1 className="text-2xl font-bold">Dream Journal</h1>
        </Link>
      </header>

      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {dream.date}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {dream.time}
            </div>
          </div>
        </div>

        <Card className="mb-6 overflow-hidden border-purple-200 bg-gradient-to-br from-purple-50 to-transparent dark:border-purple-900 dark:from-purple-950/20">
          <CardContent className="p-6">
            <h2 className="mb-4 text-2xl font-bold">{dream.title}</h2>
            <p className="mb-6 whitespace-pre-wrap text-muted-foreground">{dream.description}</p>

            <div className="flex flex-wrap gap-2">
              {dream.emotions.map((emotion) => (
                <Badge
                  key={emotion}
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {emotion}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <ShareDream dream={dream} className="mb-6" />

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-medium">Dream Type</h3>
            <p className="text-muted-foreground">{dream.type}</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Sleep Quality</h3>
            <p className="text-muted-foreground">{dream.sleepQuality}/10</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Lucidity Level</h3>
            <p className="text-muted-foreground">{dream.lucidityLevel}/5</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">Recurring</h3>
            <p className="text-muted-foreground">{dream.recurring ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

