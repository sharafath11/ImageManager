import { Document, Types } from "mongoose"

export interface IImage extends Document {
  _id: Types.ObjectId
  userId: Types.ObjectId
  title: string
  imageUrl: string
  publicId: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}
