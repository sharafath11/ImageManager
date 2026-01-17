import { Schema, model, Types } from "mongoose"
import { IImage } from "../types/Images.types"

const ImageSchema = new Schema<IImage>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 60
    },
    imageUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default model<IImage>("Image", ImageSchema)
