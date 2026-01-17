import { Request, Response } from "express"

export interface IImageController {
  upload(req: Request, res: Response): Promise<Response>
  getAll(req: Request, res: Response): Promise<Response>
  reorder(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  delete(req: Request, res: Response): Promise<Response>
}
