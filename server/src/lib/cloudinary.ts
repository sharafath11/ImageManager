import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!
})

export async function uploadImage(
  file: Express.Multer.File,
  folder = "images"
) {
  return cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
    {
      folder,
      resource_type: "image"
    }
  )
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
}
