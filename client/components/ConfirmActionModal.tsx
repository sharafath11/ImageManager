"use client"

import { Button } from "@/components/button"
import { ConfirmActionModalProps } from "@/types/common/modalTypes"

export default function ConfirmActionModal({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  isLoading,
}: ConfirmActionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-background p-5 rounded-xl space-y-3 w-80">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} isLoading={isLoading}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )
}
