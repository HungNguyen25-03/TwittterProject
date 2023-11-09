import { UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from './../constants/dir'
import path, { resolve } from 'path'
import fs from 'fs'
import formidable, { Files, File } from 'formidable'
import { Request } from 'express'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true //cho phép tạo folder nested vào nhau
      })
    }
  })
}

export const getNameFromFullname = (filename: string) => {
  const nameArr = filename.split('.')
  nameArr.pop()
  return nameArr.join('')
}

export const getExtension = (filename: string) => {
  const nameArr = filename.split('.')
  return nameArr[nameArr.length - 1]
}

//hàm xử lí file mà client đã gửi lên
export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    maxFiles: 4,
    keepExtensions: true,
    maxFieldsSize: 300 * 1024 * 4,
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image as File[])
    })
  })
}

//nhận vào request và xử lý video xem có thỏa yêu cầu kh và lưu vào video_temp
export const handleUploadVideo = async (req: Request) => {
  //cấu hình rằng mình sẽ nhận vào video thế nào: formidable
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR, //upload/video
    maxFiles: 1,
    maxFieldsSize: 50 * 1024 * 1024, //50MB
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('video/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })

  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.video) {
        return reject(new Error('Video is empty'))
      }
      //láy ra danh sách video đã upload
      const videos = files.video as File[]

      //gán đuôi cũ vào cho nó
      videos.forEach((video) => {
        const ext = getExtension(video.originalFilename as string)
        //filepath là đường dẫn mới của video nhưng k có đuổi vì mình k dùng keepExtensions
        fs.renameSync(video.filepath, video.filepath + '.' + ext)
        //newFilename là tên mới của video nhưng k có đuôi
        video.newFilename = video.newFilename + '.' + ext
      })
      return resolve(files.video as File[])
    })
  })
}
