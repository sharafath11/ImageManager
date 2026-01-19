import express from "express"
import { container } from "tsyringe"
import { TYPES } from "../core/types"
import { IImageController } from "../core/interfaces/controllers/IImage.controller"
import { authenticateToken } from "../middleware/authenticateToken"
import { uploadImages } from "../middleware/multer"

const router = express.Router()

const imageController =
  container.resolve<IImageController>(TYPES.IImageController)
router.post(
  "/upload",
  authenticateToken,
  uploadImages,
  imageController.upload.bind(imageController)
)

router.get(
  "/",
  authenticateToken,
  imageController.getAll.bind(imageController)
)

router.patch(
  "/reorder",
  authenticateToken,
  imageController.reorder.bind(imageController)
)

router.put(
  "/:id",
  authenticateToken,
  uploadImages,
  imageController.update.bind(imageController)
)
router.delete(
  "/:id",
  authenticateToken,
  imageController.delete.bind(imageController)
)

export default router
