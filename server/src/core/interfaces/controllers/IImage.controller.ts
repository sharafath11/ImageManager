import { Request, Response } from "express"

export interface IImageController {
  upload(req: Request, res: Response): Promise<void>
  getAll(req: Request, res: Response): Promise<void>
  reorder(req: Request, res: Response): Promise<void>
  update(req: Request, res: Response): Promise<void>
  delete(req: Request, res: Response): Promise<void>
}
