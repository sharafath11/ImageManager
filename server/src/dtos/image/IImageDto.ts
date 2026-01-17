export interface IImageDto {
  id: string
  userId: string
  title: string
  imageUrl: string
  publicId: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}
