"use client"

import { useRef, useState } from "react"
import { validateImageTitle, validateImageFile, validateMultiImageUpload } from "@/lib/validation/image.validation"
import { PreviewImage, PreviewImageWithError, ImageUploaderProps } from "@/types/image/validateImageUpload"
import { showErrorToast, showInfoToast, showSuccessToast } from "@/utils/toast"
import { imageMethods } from "@/services/methods/userMethods"

export default function ImageUploader({
  onUpload
}: ImageUploaderProps) {
  const [images, setImages] = useState<PreviewImageWithError[]>([])
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onFileChange = (files: FileList | null) => {
    if (!files) return

    const newImages: (PreviewImage & { errors: { title?: string, file?: string } })[] = []
    
    Array.from(files).forEach(file => {
      const fileError = validateImageFile(file)
      if (fileError) {
        showErrorToast(`${file.name}: ${fileError}`)
        return
      }

      newImages.push({
        id: crypto.randomUUID(),
        file,
        title: "",
        preview: URL.createObjectURL(file),
        errors: {}
      })
    })

    setImages(prev => [...prev, ...newImages])
  }

  const updateTitle = (id: string, value: string) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { 
          ...img, 
          title: value,
          errors: { ...img.errors, title: validateImageTitle(value) } 
        } : img
      )
    )
  }

  const removeImage = (id: string) => {
    setImages(prev => {
      const img = prev.find(i => i.id === id)
      if (img) URL.revokeObjectURL(img.preview)
      return prev.filter(i => i.id !== id)
    })
  }

  const canUpload =
    images.length > 0 &&
    images.every(img => img.title.trim().length >= 3 && !img.errors.title && !img.errors.file)

  const handleUpload = async () => {
    const result = validateMultiImageUpload(images)

    if (!result.valid) {
      setImages(prev => prev.map(img => ({
        ...img,
        errors: result.errors[img.id] || {}
      })))
      showErrorToast("Please fix the errors in your uploads")
      return
    }

    const formData = new FormData()

    images.forEach(img => {
      formData.append("images", img.file)
      formData.append("titles", img.title.trim())
    })

    try {
      setLoading(true)
      const res = await imageMethods.upload(formData)

      if (!res.ok) {
        showErrorToast(res.msg || "Upload failed")
        return
      }

      showSuccessToast("Images uploaded successfully")
      onUpload(res.data)
      setImages([])

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (err) {
      showErrorToast("Something went wrong during upload")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Upload Images</h2>
        <p className="text-sm text-muted-foreground">
          PNG, JPEG, or WebP. Max 5MB per image.
        </p>
      </div>

      {}
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border px-6 py-10 text-sm hover:bg-muted/50 transition-colors">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={e => onFileChange(e.target.files)}
        />
        <svg className="mb-3 h-10 w-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="font-medium">Click to select images</span>
        <span className="mt-1 text-xs text-muted-foreground">Multiple files allowed</span>
      </label>

      {}
      {images.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map(img => (
            <div
              key={img.id}
              className={`rounded-lg border bg-background p-3 space-y-3 transition-colors ${img.errors.title || img.errors.file ? 'border-red-500' : 'border-border'}`}
            >
              <div className="relative group">
                <img
                  src={img.preview}
                  alt="preview"
                  className="h-40 w-full rounded-md object-cover"
                />
                <button
                  onClick={() => removeImage(img.id)}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                <input
                  value={img.title}
                  onChange={e => updateTitle(img.id, e.target.value)}
                  placeholder="Enter image title"
                  className={`w-full rounded-md border bg-muted/50 px-3 py-2 text-sm focus:outline-none focus:ring-2 ${img.errors.title ? 'border-red-500 focus:ring-red-500' : 'border-border focus:ring-primary'}`}
                />
                {img.errors.title && (
                  <p className="text-[10px] font-medium text-red-500">{img.errors.title}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        disabled={!canUpload || loading}
        onClick={handleUpload}
        className="w-full sm:w-auto rounded-md bg-primary px-8 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Uploading..." : `Upload ${images.length} Image${images.length !== 1 ? 's' : ''}`}
      </button>
    </div>
  )
}
