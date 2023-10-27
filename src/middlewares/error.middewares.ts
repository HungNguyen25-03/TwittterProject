import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import { omit } from 'lodash'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Error'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  //lỗi từ các nơi trên hệ thống sẽ dồn về đây
  //lỗi nhận đc thuộc dạng ErrorWithStatus thì trả về status và message
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }

  //còn nếu code mà chạy xuống đc đâu thì error sẽ là 1 lỗi mặc định
  //err{message, stack, name}
  //stack chứa tất cả thông tin của lỗi
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  //ném lỗi đó cho ng dùng
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfor: omit(err, ['stack'])
  })
}
