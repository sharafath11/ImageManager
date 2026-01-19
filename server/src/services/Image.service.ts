import { inject, injectable } from "tsyringe"
import { Types } from "mongoose"
import { IImageService } from "../core/interfaces/services/IImage.service"
import { IImageRepository } from "../core/interfaces/repository/IImageRepository"
import { TYPES } from "../core/types"
import { throwError } from "../utils/response"
import { MESSAGES } from "../const/messages"
import { uploadImage, deleteImage } from "../lib/cloudinary"
import { ImageResponseMapper } from "../dtos/image/ImageResponseMapper"
import { IImageDto } from "../dtos/image/IImageDto"

@injectable()
export class ImageService implements IImageService {
  constructor(
    @inject(TYPES.IImageRepository)
    private _imageRepo: IImageRepository
  ) {}

  async uploadImages(
    userId: string,
    files: Express.Multer.File[],
    titles: string[]
  ): Promise<IImageDto[]> {
    if (files.length !== titles.length) {
      throwError("Images and titles count mismatch")
    }

    const userObjectId = new Types.ObjectId(userId)

    const images = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const title = titles[i]

      if (!title?.trim()) {
        throwError("Image title is required")
      }

      const uploadResult = await uploadImage(file, "user-images")

      const image = await this._imageRepo.create({
        userId: userObjectId,
        title: title.trim(),
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        order: i
      })

      images.push(image)
    }

    return images.map(ImageResponseMapper.toImageDto)
  }

  async getImages(userId: string): Promise<IImageDto[]> {
    const userObjectId = new Types.ObjectId(userId)

    const images = await this._imageRepo.findAll({
      userId: userObjectId
    })
    const imageDto = images.map(ImageResponseMapper.toImageDto)
     
    return imageDto.sort((a, b) => a.order - b.order)
  }

  async reorderImages(
    userId: string,
    images: { id: string; order: number }[]
  ): Promise<void> {
    const userObjectId = new Types.ObjectId(userId)

    for (const img of images) {
      await this._imageRepo.update(img.id, {
        order: img.order,
        userId: userObjectId
      })
    }
  }

  async updateImage(
    userId: string,
    imageId: string,
    data: {
      title?: string
      file?: Express.Multer.File
    }
  ): Promise<IImageDto> {
    const image = await this._imageRepo.findById(imageId)
    if (!image) throwError(MESSAGES.COMMON.NOT_FOUND)

    if (image.userId.toString() !== userId) {
      throwError(MESSAGES.AUTH.UNAUTHORIZED)
    }

    let imageUrl = image.imageUrl
    let publicId = image.publicId

    if (data.file) {
      await deleteImage(publicId)
      const uploadResult = await uploadImage(data.file, "user-images")
      imageUrl = uploadResult.secure_url
      publicId = uploadResult.public_id
    }

    const updated = await this._imageRepo.update(imageId, {
      title: data.title ?? image.title,
      imageUrl,
      publicId
    })

    if (!updated) throwError(MESSAGES.COMMON.SERVER_ERROR)

    return ImageResponseMapper.toImageDto(updated)
  }

  async deleteImage(
    userId: string,
    imageId: string
  ): Promise<void> {
    const image = await this._imageRepo.findById(imageId)
    if (!image) throwError(MESSAGES.COMMON.NOT_FOUND)

    if (image.userId.toString() !== userId) {
      throwError(MESSAGES.AUTH.UNAUTHORIZED)
    }

    await deleteImage(image.publicId)
    await this._imageRepo.delete(imageId)
  }
}
