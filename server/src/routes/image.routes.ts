import express from "express"
import { container } from "tsyringe"
import { TYPES } from "../core/types"
import { IImageController } from "../core/interfaces/controllers/IImage.Controller"
import { authenticateToken } from "../middleware/authenticateToken"
import { uploadImages } from "../middleware/multer"

const router = express.Router()

const imageController =
  container.resolve<IImageController>(TYPES.IImageController)

// Upload images with titles (bulk)
router.post(
  "/upload",
  authenticateToken,
  uploadImages,
  imageController.upload.bind(imageController)
)

// Get all images of logged-in user
router.get(
  "/",
  authenticateToken,
  imageController.getAll.bind(imageController)
)

// Reorder images
router.patch(
  "/reorder",
  authenticateToken,
  imageController.reorder.bind(imageController)
)

// Edit image and/or title
router.put(
  "/:id",
  authenticateToken,
  uploadImages,
  imageController.update.bind(imageController)
)

// Delete image
router.delete(
  "/:id",
  authenticateToken,
  imageController.delete.bind(imageController)
)

export default router
