import { IImage } from "../../types/Images.types";
import { IImageDto } from "./IImageDto";

export class ImageResponseMapper {
  static toImageDto(image: IImage): IImageDto {
    return {
      id: image._id.toString(),
      userId: image.userId.toString(),
      title: image.title,
      imageUrl: image.imageUrl,
      publicId: image.publicId,
      order: image.order,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt
    };
  }
}
