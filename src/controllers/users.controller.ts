import { Request, Response } from 'express'
import User from '~/models/schema/User.schema'
import databaseService from '~/services/database.services'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/user.request'

export const loginController = async (req: Request, res: Response) => {
  //lấy user_id từ user của req
  const { user }: any = req
  const user_id = user._id
  //dùng user_id tạo access_token và refesh_token
  const result = await userService.login(user_id.toString())
  //respone về access_token và refresh_token cho client
  res.json({
    message: 'login successful',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  const result = await userService.register(req.body)
  res.json({
    message: 'register successful',
    result
  })
}
