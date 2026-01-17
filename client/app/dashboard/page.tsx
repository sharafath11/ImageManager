"use client"

import { useState } from "react"
import Header from "@/components/user/Header"
import ImageUploader from "./components/ImageUploader"
import ImageGrid from "./components/ImageGrid"

export default function DashboardPage() {
  const [images, setImages] = useState<any[]>([])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="px-4 py-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              Image Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Upload, organize, edit, and manage your images
            </p>
          </div>

          <ImageUploader onUpload={setImages} />
          <ImageGrid images={images} setImages={setImages} />
        </div>
      </main>
    </div>
  )
}
