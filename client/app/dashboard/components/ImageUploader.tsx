"use client"

import { useState } from "react"
import { validateImageUpload } from "@/lib/validation/imageUploadValidation"
import { PreviewImage } from "@/types/image/validateImageUpload"


export default function ImageUploader({
  onUpload
}: {
  onUpload: (data: PreviewImage[]) => void
}) {
  const [images, setImages] = useState<PreviewImage[]>([])

  const onFileChange = (files: FileList | null) => {
    if (!files) return

    const mapped = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      file,
      title: "",
      preview: URL.createObjectURL(file)
    }))

    setImages(prev => [...prev, ...mapped])
  }

  const updateTitle = (id: string, value: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, title: value } : img
      )
    )
  }

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }

  const canUpload =
    images.length > 0 &&
    images.every(img => img.title.trim().length > 0)

 

const handleUpload = () => {
  const result = validateImageUpload(images)

  if (!result.valid) {
    alert(result.error)
    return
  }

  onUpload(images)
  setImages([])
}


  return (
    <div className="rounded-xl border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Upload Images</h2>
        <p className="text-sm text-muted-foreground">
          Each image must have a title
        </p>
      </div>

      {/* File Input */}
      <label className="flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-border px-6 py-10 text-sm hover:bg-muted">
        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => onFileChange(e.target.files)}
        />
        Click to select images
      </label>

      {/* Preview List */}
      {images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(img => (
            <div
              key={img.id}
              className="rounded-lg border bg-background p-3 space-y-3"
            >
              <img
                src={img.preview}
                alt="preview"
                className="h-40 w-full rounded-md object-cover"
              />

              <input
                value={img.title}
                onChange={e => updateTitle(img.id, e.target.value)}
                placeholder="Enter image title"
                className="w-full rounded-md border px-3 py-2 text-sm"
              />

              <button
                onClick={() => removeImage(img.id)}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        disabled={!canUpload}
        onClick={handleUpload}
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
      >
        Upload Images
      </button>
    </div>
  )
}
