"use client"

import { useEffect, useRef } from "react"
import { Calendar, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDreams } from "@/lib/dreams"

export function DreamStats() {
  const dreams = getDreams()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Count dream types
  const dreamTypes = dreams.reduce(
    (acc, dream) => {
      acc[dream.type] = (acc[dream.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Count emotions
  const emotions = dreams.reduce(
    (acc, dream) => {
      dream.emotions.forEach((emotion) => {
        acc[emotion] = (acc[emotion] || 0) + 1
      })
      return acc
    },
    {} as Record<string, number>,
  )

  // Get top emotions
  const topEmotions = Object.entries(emotions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Calculate average sleep quality
  const avgSleepQuality = dreams.length ? dreams.reduce((sum, dream) => sum + dream.sleepQuality, 0) / dreams.length : 0

  // Draw simple bar chart
  useEffect(() => {
    if (!canvasRef.current || dreams.length === 0) return

    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    const canvas = canvasRef.current
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Prepare data
    const types = Object.keys(dreamTypes)
    const values = Object.values(dreamTypes)
    const maxValue = Math.max(...values)

    // Colors
    const barColors = [
      "rgba(147, 51, 234, 0.7)", // purple-600
      "rgba(168, 85, 247, 0.7)", // purple-500
      "rgba(192, 132, 252, 0.7)", // purple-400
      "rgba(216, 180, 254, 0.7)", // purple-300
      "rgba(233, 213, 255, 0.7)", // purple-200
    ]

    // Draw bars
    const barWidth = (rect.width - 40) / types.length
    const barMargin = 8
    const maxBarHeight = rect.height - 40

    types.forEach((type, i) => {
      const barHeight = (values[i] / maxValue) * maxBarHeight
      const x = 20 + i * barWidth
      const y = rect.height - 20 - barHeight

      // Draw bar
      ctx.fillStyle = barColors[i % barColors.length]
      ctx.fillRect(x + barMargin / 2, y, barWidth - barMargin, barHeight)

      // Draw label
      ctx.fillStyle = "#888888"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(type.substring(0, 8), x + barWidth / 2, rect.height - 5)

      // Draw value
      ctx.fillStyle = "#888888"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(values[i].toString(), x + barWidth / 2, y - 5)
    })
  }, [dreams, dreamTypes])

  if (dreams.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Dream Statistics</CardTitle>
          <CardDescription>Record dreams to see statistics</CardDescription>
        </CardHeader>
        <CardContent className="flex h-40 items-center justify-center text-muted-foreground">
          No dream data available yet
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Dream Types</CardTitle>
        </CardHeader>
        <CardContent>
          <canvas ref={canvasRef} className="h-40 w-full"></canvas>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Dream Summary</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="mb-1 text-sm font-medium">Total Dreams</div>
              <div className="text-2xl font-bold">{dreams.length}</div>
            </div>

            <div>
              <div className="mb-1 text-sm font-medium">Average Sleep Quality</div>
              <div className="text-2xl font-bold">{avgSleepQuality.toFixed(1)}/10</div>
            </div>

            <div>
              <div className="mb-1 text-sm font-medium">Recurring Dreams</div>
              <div className="text-2xl font-bold">{dreams.filter((d) => d.recurring).length}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Top Emotions</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topEmotions.map(([emotion, count]) => (
              <div key={emotion} className="flex items-center justify-between">
                <span className="text-sm">{emotion}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

