import { IImageDto } from "../../../dtos/image/IImageDto"

export interface IImageService {
  uploadImages(
    userId: string,
    files: Express.Multer.File[],
    titles: string[]
  ): Promise<IImageDto[]>

  getImages(userId: string): Promise<IImageDto[]>

  reorderImages(
    userId: string,
    images: { id: string; order: number }[]
  ): Promise<void>

  updateImage(
    userId: string,
    imageId: string,
    data: {
      title?: string
      file?: Express.Multer.File
    }
  ): Promise<IImageDto>

  deleteImage(
    userId: string,
    imageId: string
  ): Promise<void>
}
