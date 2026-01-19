"use client"

import { useState } from "react"
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"

import { showInfoToast } from "@/utils/toast"
import { imageMethods } from "@/services/methods/userMethods"
import { IImage } from "@/types/image/imageTypes"

import SortableImageCard from "./SortableImageCard"
import DeleteConfirmModal from "./DeleteConfirmModal"
import EditImageModal from "./EditImageModal"

import { Dispatch, SetStateAction } from "react"

interface ImageGridProps {
  images: IImage[]
  setImages: Dispatch<SetStateAction<IImage[]>>
}

export default function ImageGrid({ images, setImages }: ImageGridProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [editImage, setEditImage] = useState<IImage | null>(null)
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean
    imageId: string
    title: string
  }>({
    isOpen: false,
    imageId: "",
    title: "",
  })

  const isDndDisabled = isUpdating || images.length <= 1

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
      disabled: isDndDisabled
    }),
    useSensor(TouchSensor, {
        activationConstraint: {
          delay: 200,
          tolerance: 5,
        },
        disabled: isDndDisabled
      }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      disabled: isDndDisabled
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    if (isUpdating) return

    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = images.findIndex(i => i.id === active.id)
    const newIndex = images.findIndex(i => i.id === over.id)

    const previousImages = [...images]
    const reordered = arrayMove(images, oldIndex, newIndex)

    const updated = reordered.map((img, idx) => ({
      ...img,
      order: idx + 1,
    }))

    setImages(updated)

    try {
      setIsUpdating(true)
      const payload = updated.map(img => ({ id: img.id, order: img.order }))
      const res = await imageMethods.reorder(payload)

      if (!res.ok) throw new Error()
      showInfoToast("Order saved successfully")
    } catch {
      setImages(previousImages)
      showInfoToast("Reorder failed. Rolling back…")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteConfirm = async () => {
    try {
      setIsUpdating(true)
      const res = await imageMethods.delete(deleteModal.imageId)
      if (res) {
        setImages(prev => prev.filter(img => img.id !== deleteModal.imageId))
        showInfoToast("Image deleted successfully")
      }
    } catch {
      showInfoToast("Deletion failed")
    } finally {
      setIsUpdating(false)
      setDeleteModal({ isOpen: false, imageId: "", title: "" })
    }
  }

  const handleImageUpdated = (updated: IImage) => {
    setImages(prev =>
      prev.map(img => (img.id === updated.id ? updated : img))
    )
  }

  if (!images.length) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        No images uploaded yet
      </div>
    )
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map(img => img.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map(image => (
              <SortableImageCard
                key={image.id}
                image={image}
                disabled={isUpdating}
                onEdit={(img) => setEditImage(img)}
                onDelete={() =>
                  setDeleteModal({
                    isOpen: true,
                    imageId: image.id,
                    title: image.title,
                  })
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        isLoading={isUpdating}
        onClose={() =>
          setDeleteModal({ isOpen: false, imageId: "", title: "" })
        }
        onConfirm={handleDeleteConfirm}
      />

      <EditImageModal
        isOpen={!!editImage}
        image={editImage}
        onClose={() => setEditImage(null)}
        onUpdated={handleImageUpdated}
      />
    </>
  )
}
