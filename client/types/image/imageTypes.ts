export type ImageItem = {
  _id: string
  title: string
  imageUrl: string
  order: number
}

export type ImageReorderPayload = {
  id: string
  order: number
}

export type ImageUpdatePayload = {
  title?: string
  image?: File
}
export interface IImage{
  id: string
  imageUrl: string
  title: string
  order: number
}

export interface ImageValidationError {
  title?: string;
  file?: string;
}

export interface MultiImageValidationResult {
  valid: boolean;
  errors: Record<string, ImageValidationError>;
}