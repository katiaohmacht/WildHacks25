"use client"

import { useState } from "react"
import { Facebook, LinkIcon, Linkedin, Mail, Share2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import type { Dream } from "@/lib/dreams"

interface ShareDreamProps {
  dream: Dream
  className?: string
}

export function ShareDream({ dream, className }: ShareDreamProps) {
  const { toast } = useToast()
  const [isExpanded, setIsExpanded] = useState(false)

  // Create share text
  const shareTitle = `Check out my dream: ${dream.title}`
  const shareText = `${dream.title} - ${dream.description.substring(0, 100)}${dream.description.length > 100 ? "..." : ""}`

  // Create share URLs
  const encodedTitle = encodeURIComponent(shareTitle)
  const encodedText = encodeURIComponent(shareText)
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""
  const encodedUrl = encodeURIComponent(currentUrl)

  const shareLinks = [
    {
      name: "Twitter/X",
      icon: <X className="h-4 w-4" />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "bg-black hover:bg-gray-800 text-white",
    },
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-4 w-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-blue-700 hover:bg-blue-800 text-white",
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: "bg-green-600 hover:bg-green-700 text-white",
    },
  ]

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The link to this dream has been copied to your clipboard.",
        })
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Failed to copy link",
          description: "Please try again or copy the URL manually.",
          variant: "destructive",
        })
      })
  }

  return (
    <Card className={`border-purple-200 p-4 dark:border-purple-900 ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-purple-600" />
          <h3 className="text-sm font-medium">Share this dream</h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {isExpanded ? (
            <TooltipProvider>
              {shareLinks.map((link) => (
                <Tooltip key={link.name}>
                  <TooltipTrigger asChild>
                    <Button size="sm" className={link.color} onClick={() => window.open(link.url, "_blank")}>
                      {link.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share on {link.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-200 hover:border-purple-300 hover:bg-purple-50 dark:border-purple-800 dark:hover:border-purple-700 dark:hover:bg-purple-950/50"
                    onClick={copyToClipboard}
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy link</p>
                </TooltipContent>
              </Tooltip>

              <Button size="sm" variant="ghost" onClick={() => setIsExpanded(false)} className="text-xs">
                Less
              </Button>
            </TooltipProvider>
          ) : (
            <>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsExpanded(true)}>
                Share Dream
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

