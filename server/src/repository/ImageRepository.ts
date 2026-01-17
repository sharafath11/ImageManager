import { BaseRepository } from "./baseRepository";
import { IImage } from "../types/Images.types";
import { IImageRepository } from "../core/interfaces/repository/IImageRepository";
import Image from "../models/Image.model";

export class ImageRepository extends BaseRepository<IImage, IImage> implements IImageRepository {
    constructor() {
        super(Image);
    }
}
