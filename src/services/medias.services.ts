import sharp from 'sharp'
import { Request } from 'express'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/flie'
import { UPLOAD_DIR } from '~/constants/dir'
import fs from 'fs'
import { isProduction } from '~/constants/config'

class MediaService {
  async handleUploadSingleImage(req: Request) {
    //lưu ảnh vào trong uploads/temp
    const file = await handleUploadSingleImage(req)
    //xử lý fiel bằng sharp giúp tối ưu hình ảnh
    const newFilename = getNameFromFullname(file.newFilename) + '.jpg'
    const newPath = UPLOAD_DIR + '/' + newFilename
    const info = await sharp(file.filepath).jpeg().toFile(newPath)
    //xóa file trong temp
    fs.unlinkSync(file.filepath)
    return isProduction
      ? `${process.env.HOST}/static/${newFilename}`
      : `http://localhost:${process.env.PORT}/static/${newFilename}`
  }
}

const mediaService = new MediaService()
export default mediaService
