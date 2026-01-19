"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { imageMethods } from "@/services/methods/userMethods"
import { showInfoToast, showErrorToast, showSuccessToast } from "@/utils/toast"
import { IImage } from "@/types/image/imageTypes"
import ConfirmActionModal from "@/components/ConfirmActionModal"
import { validateImageTitle, validateImageFile } from "@/lib/validation/image.validation"
import { EditImageModalProps as Props } from "@/types/common/modalTypes"

export default function EditImageModal({
  isOpen,
  image,
  onClose,
  onUpdated,
}: Props) {
  const [title, setTitle] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [noChanges, setNoChanges] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; file?: string }>({})

  useEffect(() => {
    if (image) {
      setTitle(image.title)
      setFile(null)
      setErrors({})
    }
  }, [image])

  if (!isOpen || !image) return null

  const hasChanges = title.trim() !== image.title || file !== null

  const handlePreSave = () => {
    if (!hasChanges) {
      setNoChanges(true)
      return
    }

    const titleError = validateImageTitle(title)
    let fileError = ""
    if (file) {
      fileError = validateImageFile(file)
    }

    if (titleError || fileError) {
      setErrors({ title: titleError, file: fileError })
      showErrorToast("Please fix the validation errors")
      return
    }

    setConfirm(true)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append("title", title.trim())
      if (file) {
        formData.append("images", file)
      }

      const res = await imageMethods.update(image.id, formData as any) 
      
      if (res) {
        onUpdated(res.data)
        showSuccessToast("Image updated successfully")
        setConfirm(false)
        onClose()
      }
    } catch (error) {
      showErrorToast("Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div 
          className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-6 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Edit Image</h3>
            <p className="text-sm text-muted-foreground">Modify the details of your image.</p>
          </div>

          <div className="space-y-4">
            <div className={`relative group aspect-video rounded-xl overflow-hidden border bg-muted transition-colors ${errors.file ? 'border-red-500' : 'border-border'}`}>
              <img
                src={file ? URL.createObjectURL(file) : image.imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null
                    if (selectedFile) {
                        const err = validateImageFile(selectedFile)
                        if (err) {
                            showErrorToast(err)
                            return
                        }
                    }
                    setFile(selectedFile)
                    setErrors(prev => ({ ...prev, file: "" }))
                  }}
                />
                <span className="text-white text-sm font-medium">Change Image</span>
              </label>
            </div>
            {errors.file && <p className="text-xs font-medium text-red-500">{errors.file}</p>}

            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={title} 
                onChange={(e) => {
                    setTitle(e.target.value)
                    setErrors(prev => ({ ...prev, title: "" }))
                }}
                placeholder="Image Title"
                error={errors.title}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button 
              onClick={handlePreSave}
              disabled={loading}
              isLoading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={confirm}
        title="Save Changes"
        description="Are you sure you want to update this image? This will replace the existing title and image data."
        onConfirm={handleSave}
        onCancel={() => setConfirm(false)}
        isLoading={loading}
      />

      <ConfirmActionModal
        isOpen={noChanges}
        title="No Changes Detected"
        description="You haven't made any changes. Do you want to close this modal?"
        onConfirm={() => {
            setNoChanges(false)
            onClose()
        }}
        onCancel={() => setNoChanges(false)}
      />
    </>
  )
}
