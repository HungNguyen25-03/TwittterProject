import { Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { UPLOAD_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/medias.services'
import { handleUploadSingleImage } from '~/utils/flie'

export const uploadSingleImageController = async (req: Request, res: Response) => {
  const url = await mediaService.handleUploadSingleImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveImageController = async (req: Request, res: Response) => {
  const { nameFile } = req.params
  res.sendFile(path.resolve(UPLOAD_DIR, nameFile), (error) => {
    if (error) {
      res.status((error as any).status).send('Not found image')
    }
  })
}
