export type UploadImage = {
  title: string
}

export type ValidationResult = {
  valid: boolean
  error?: string
}
export type PreviewImage = {
  id: string
  file: File
  title: string
  preview: string
}

export type PreviewImageWithError = PreviewImage & {
  errors: { title?: string; file?: string }
}

export interface ImageUploaderProps {
  onUpload: (data: any[]) => void
}