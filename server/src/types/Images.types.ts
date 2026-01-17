import { Types } from "mongoose"

export interface IImage {
  _id: string
  userId: Types.ObjectId
  title: string
  imageUrl: string
  publicId: string
  order: number
  createdAt?: Date
  updatedAt?: Date
}
