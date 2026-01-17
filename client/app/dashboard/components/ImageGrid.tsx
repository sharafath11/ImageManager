"use client"

import SortableImageCard from "./SortableImageCard"

export default function ImageGrid({
  images,
  setImages
}: {
  images: any[]
  setImages: (data: any[]) => void
}) {
  const handleReorder = (from: number, to: number) => {
    const updated = [...images]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)

    console.log("Reordered images:", updated)
    setImages(updated)
  }

  if (!images.length) {
    return (
      <div className="text-center py-16 text-muted-foreground text-sm">
        No images uploaded yet
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {images.map((image, index) => (
        <SortableImageCard
          key={image.id}
          image={image}
          index={index}
          onMove={handleReorder}
          onDelete={() => {
            console.log("Delete image:", image)
            setImages(images.filter((_, i) => i !== index))
          }}
        />
      ))}
    </div>
  )
}
