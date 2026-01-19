"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { IImage } from "@/types/image/imageTypes"
import { Trash2, GripVertical, Pencil } from "lucide-react"

interface Props {
  image: IImage
  onDelete: () => void
  onEdit: (image: IImage) => void
  disabled?: boolean
}

export default function SortableImageCard({
  image,
  onDelete,
  onEdit,
  disabled = false,
}: Props) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: image.id, disabled })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl border bg-card overflow-hidden"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100"
      >
        <GripVertical />
      </div>

      <img
        src={image.imageUrl}
        alt={image.title}
        className="h-48 w-full object-cover"
      />

      <div className="p-2 flex justify-between items-center relative z-20">
        <span className="truncate text-sm">{image.title}</span>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit(image)
            }}
            disabled={disabled}
            className="hover:text-primary transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            disabled={disabled}
            className="hover:text-destructive transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
