"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, Search } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getDreams } from "@/lib/dreams"

export function DreamList() {
  const dreams = getDreams()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  const filteredDreams = dreams.filter(
    (dream) =>
      dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.emotions.some((emotion) => emotion.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const sortedDreams = [...filteredDreams].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()

    if (sortBy === "newest") {
      return dateB - dateA
    } else if (sortBy === "oldest") {
      return dateA - dateB
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title)
    }
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dreams..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title">Title</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedDreams.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">No dreams found</p>
          <p className="text-sm text-muted-foreground">Try a different search term or add a new dream</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sortedDreams.map((dream) => (
            <Link key={dream.id} href={`/dreams/${dream.id}`}>
              <Card className="transition-all hover:border-purple-300 hover:shadow-md dark:hover:border-purple-700">
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="font-medium">{dream.title}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {dream.date}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {dream.time}
                      </div>
                    </div>
                  </div>

                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{dream.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {dream.emotions.slice(0, 3).map((emotion) => (
                      <Badge key={emotion} variant="outline" className="text-xs">
                        {emotion}
                      </Badge>
                    ))}
                    {dream.emotions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{dream.emotions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

