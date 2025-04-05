"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { addDream } from "@/lib/dreams"

const emotions = ["Happy", "Sad", "Scared", "Anxious", "Peaceful", "Confused", "Excited", "Angry", "Surprised"]

export function DreamForm() {
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter((e) => e !== emotion))
    } else {
      setSelectedEmotions([...selectedEmotions, emotion])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const dreamData = {
      id: Date.now().toString(),
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      date: date.toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      type: formData.get("dreamType") as string,
      emotions: selectedEmotions,
      recurring: formData.get("recurring") === "on",
      sleepQuality: Number(formData.get("sleepQuality")),
      lucidityLevel: Number(formData.get("lucidityLevel")),
    }

    // Add the dream to our storage
    addDream(dreamData)

    // Simulate a delay for the submission
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/")
    }, 1000)
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-transparent dark:border-purple-900 dark:from-purple-950/20">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Dream Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Give your dream a title"
              required
              className="border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-200 text-left font-normal dark:border-purple-800"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleDateString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Dream Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your dream in detail..."
              required
              className="min-h-32 border-purple-200 focus-visible:ring-purple-500 dark:border-purple-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dreamType">Dream Type</Label>
            <Select name="dreamType" defaultValue="normal">
              <SelectTrigger className="border-purple-200 focus:ring-purple-500 dark:border-purple-800">
                <SelectValue placeholder="Select dream type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal Dream</SelectItem>
                <SelectItem value="lucid">Lucid Dream</SelectItem>
                <SelectItem value="nightmare">Nightmare</SelectItem>
                <SelectItem value="daydream">Daydream</SelectItem>
                <SelectItem value="recurring">Recurring Dream</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Emotions Felt</Label>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => (
                <div key={emotion} className="flex items-center space-x-2">
                  <Checkbox
                    id={`emotion-${emotion}`}
                    checked={selectedEmotions.includes(emotion)}
                    onCheckedChange={() => toggleEmotion(emotion)}
                    className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:border-purple-800"
                  />
                  <label
                    htmlFor={`emotion-${emotion}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {emotion}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                name="recurring"
                className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:border-purple-800"
              />
              <Label htmlFor="recurring">Recurring Dream</Label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="sleepQuality">Sleep Quality (1-10)</Label>
              <div className="pt-2">
                <Slider
                  id="sleepQuality"
                  name="sleepQuality"
                  defaultValue={[7]}
                  max={10}
                  min={1}
                  step={1}
                  className="[&>span]:bg-purple-600"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Lucidity Level</Label>
              <RadioGroup defaultValue="1" name="lucidityLevel" className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <RadioGroupItem
                      value={value.toString()}
                      id={`lucidity-${value}`}
                      className="border-purple-200 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:border-purple-800"
                    />
                    <Label htmlFor={`lucidity-${value}`} className="mt-1 text-xs">
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not lucid</span>
                <span>Fully lucid</span>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Dream"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

