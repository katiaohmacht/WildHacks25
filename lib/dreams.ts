// This is a simple client-side storage solution
// In a real app, you'd use a database

export interface Dream {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: string
  emotions: string[]
  recurring: boolean
  sleepQuality: number
  lucidityLevel: number
}

// Sample dreams data
const sampleDreams: Dream[] = [
  {
    id: "1",
    title: "Flying Over Mountains",
    description:
      "I was flying over snow-capped mountains. The air was crisp and I could see for miles. I felt completely free and in control of my flight.",
    date: "2023-04-01",
    time: "07:30:00",
    type: "lucid",
    emotions: ["Happy", "Peaceful", "Excited"],
    recurring: false,
    sleepQuality: 9,
    lucidityLevel: 4,
  },
  {
    id: "2",
    title: "Lost in a Maze",
    description:
      "I was trapped in an endless maze with walls that kept changing. Every time I thought I found the exit, the path would shift. I felt increasingly anxious as time went on.",
    date: "2023-03-28",
    time: "06:45:00",
    type: "nightmare",
    emotions: ["Anxious", "Confused", "Scared"],
    recurring: true,
    sleepQuality: 4,
    lucidityLevel: 2,
  },
  {
    id: "3",
    title: "Underwater City",
    description:
      "I discovered a beautiful city beneath the ocean. The buildings were made of coral and crystal, and I could breathe underwater. Fish of all colors swam around me as I explored.",
    date: "2023-03-25",
    time: "08:15:00",
    type: "normal",
    emotions: ["Surprised", "Peaceful", "Happy"],
    recurring: false,
    sleepQuality: 8,
    lucidityLevel: 3,
  },
]

// Get all dreams from storage or use sample data if none exist
export function getDreams(): Dream[] {
  if (typeof window === "undefined") return []

  const storedDreams = localStorage.getItem("dreams")
  if (storedDreams) {
    return JSON.parse(storedDreams)
  } else {
    // Initialize with sample dreams
    localStorage.setItem("dreams", JSON.stringify(sampleDreams))
    return sampleDreams
  }
}

// Get a single dream by ID
export function getDream(id: string): Dream | undefined {
  const dreams = getDreams()
  return dreams.find((dream) => dream.id === id)
}

// Add a new dream
export function addDream(dream: Dream): void {
  if (typeof window === "undefined") return

  const dreams = getDreams()
  dreams.push(dream)
  localStorage.setItem("dreams", JSON.stringify(dreams))
}

// Delete a dream
export function deleteDream(id: string): void {
  if (typeof window === "undefined") return

  const dreams = getDreams()
  const updatedDreams = dreams.filter((dream) => dream.id !== id)
  localStorage.setItem("dreams", JSON.stringify(updatedDreams))
}

