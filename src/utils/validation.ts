//đây là hàm tiện ích chạy đc ở nhiều nơi

import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import { EntityError, ErrorWithStatus } from '~/models/Error'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validations.run(req)

    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()
    const entityError = new EntityError({ errors: {} })
    //xử lý errorObject
    for (const key in errorObject) {
      //lấy msg của từng cái lỗi
      const { msg } = errorObject[key]
      //nếu mà msg có dạng ErrorWithStatus và status !== 422 thì ném cho default error hanlder
      if (msg instanceof ErrorWithStatus && msg.status !== 422) {
        return next(msg)
      }

      //lỗi các lỗi 422 từ errorObject vào entityError
      entityError.errors[key] = msg
    }
    //ở đây nó xử lý lỗi luôn, chứ kh ném về error default handler (error handler tổng)
    next(entityError)
  }
}
