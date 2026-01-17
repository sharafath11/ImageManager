import { UploadImage, ValidationResult } from "@/types/image/validateImageUpload"


const MIN_IMAGES = 1
const MAX_IMAGES = 10
const TITLE_MIN = 3
const TITLE_MAX = 60

export function validateImageUpload(
  images: UploadImage[]
): ValidationResult {
  if (images.length < MIN_IMAGES) {
    return { valid: false, error: `Add at least ${MIN_IMAGES} image` }
  }

  if (images.length > MAX_IMAGES) {
    return { valid: false, error: `Max ${MAX_IMAGES} images allowed` }
  }

  for (const img of images) {
    const title = img.title.trim()

    if (!title) {
      return { valid: false, error: "Every image must have a title" }
    }

    if (title.length < TITLE_MIN) {
      return {
        valid: false,
        error: `Title must be at least ${TITLE_MIN} characters`
      }
    }

    if (title.length > TITLE_MAX) {
      return {
        valid: false,
        error: `Title must be less than ${TITLE_MAX} characters`
      }
    }
  }

  return { valid: true }
}
