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