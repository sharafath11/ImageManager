import { Request, Response } from "express"
import { inject, injectable } from "tsyringe"
import { TYPES } from "../core/types"
import { MESSAGES } from "../const/messages"
import { StatusCode } from "../enums/statusCode"
import {
  handleControllerError,
  sendResponse,
  throwError
} from "../utils/response"
import { decodeToken } from "../utils/jwtToken"
import { IImageController } from "../core/interfaces/controllers/IImage.controller"
import { IImageService } from "../core/interfaces/services/IImage.service"

@injectable()
export class ImageController implements IImageController {
  constructor(
    @inject(TYPES.IImageService)
    private _imageServices: IImageService
  ) {}

  async upload(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.token
      const decoded = decodeToken(accessToken)

      if (!decoded) {
        throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED)
      }

      const userId = decoded.id
      const files = req.files as Express.Multer.File[]
      const { titles } = req.body

      if (!files || !files.length) {
        throwError("Images are required", StatusCode.BAD_REQUEST)
      }

      if (!titles || files.length !== titles.length) {
        throwError("Each image must have a title", StatusCode.BAD_REQUEST)
      }

      const result = await this._imageServices.uploadImages(
        userId,
        files,
        titles
      )

      sendResponse(
        res,
        StatusCode.CREATED,
        MESSAGES.COMMON.SUCCESS,
        true,
        result
      )
    } catch (error) {
      handleControllerError(res, error)
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.token
      const decoded = decodeToken(accessToken)

      if (!decoded) {
        throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED)
      }

      const userId = decoded.id
      const result = await this._imageServices.getImages(userId)

      sendResponse(
        res,
        StatusCode.OK,
        MESSAGES.COMMON.SUCCESS,
        true,
        result
      )
    } catch (error) {
      handleControllerError(res, error)
    }
  }

  async reorder(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.token
      const decoded = decodeToken(accessToken)

      if (!decoded) {
        throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED)
      }

      const userId = decoded.id
      const { images } = req.body

      if (!Array.isArray(images)) {
        throwError("Invalid reorder payload", StatusCode.BAD_REQUEST)
      }

      await this._imageServices.reorderImages(userId, images)

      sendResponse(
        res,
        StatusCode.OK,
        MESSAGES.COMMON.SUCCESS,
        true
      )
    } catch (error) {
      handleControllerError(res, error)
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.token
      const decoded = decodeToken(accessToken)

      if (!decoded) {
        throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED)
      }

      const userId = decoded.id
      const imageId = req.params.id
      const file = (req.files as Express.Multer.File[])?.[0]
      const { title } = req.body

      if (!title && !file) {
        throwError("Nothing to update", StatusCode.BAD_REQUEST)
      }

      const result = await this._imageServices.updateImage(
        userId,
        imageId,
        { title, file }
      )

      sendResponse(
        res,
        StatusCode.OK,
        MESSAGES.COMMON.SUCCESS,
        true,
        result
      )
    } catch (error) {
      handleControllerError(res, error)
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const accessToken = req.cookies.token
      const decoded = decodeToken(accessToken)

      if (!decoded) {
        throwError(MESSAGES.AUTH.AUTH_REQUIRED, StatusCode.UNAUTHORIZED)
      }

      const userId = decoded.id
      const imageId = req.params.id

      await this._imageServices.deleteImage(userId, imageId)

      sendResponse(
        res,
        StatusCode.OK,
        MESSAGES.COMMON.SUCCESS,
        true
      )
    } catch (error) {
      handleControllerError(res, error)
    }
  }
}
