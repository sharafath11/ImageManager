"use client"

export default function SortableImageCard({
  image,
  index,
  onMove,
  onDelete
}: {
  image: any
  index: number
  onMove: (from: number, to: number) => void
  onDelete: () => void
}) {
  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={image.url}
        alt={image.title}
        className="h-36 w-full object-cover"
      />

      <div className="p-3 space-y-2">
        <p className="text-sm font-medium truncate">{image.title}</p>

        <div className="flex items-center justify-between text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => onMove(index, index - 1)}
              disabled={index === 0}
              className="text-muted-foreground hover:text-foreground disabled:opacity-30"
            >
              ↑
            </button>
            <button
              onClick={() => onMove(index, index + 1)}
              className="text-muted-foreground hover:text-foreground"
            >
              ↓
            </button>
          </div>

          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
