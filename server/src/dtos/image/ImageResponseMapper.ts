import { IImage } from "../../types/Images.types";
import { IImageDto } from "./IImageDto";

export class ImageResponseMapper {
  static toImageDto(image: IImage): IImageDto {
    return {
      id: image._id.toString(),
      title: image.title,
      imageUrl: image.imageUrl,
      order: image.order,
    };
  }
}
