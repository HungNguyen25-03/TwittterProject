//khai báo
import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()
//middleware

/*
des: đăng nhập
path: /users/login
method: POST
body: {email, password}
*/
usersRouter.get('/login', loginValidator, wrapAsync(loginController))

usersRouter.post('/register', registerValidator, wrapAsync(registerController))

/*
des: đăng xuất
path: /users/logout
method: POST
Header: {Authorization: Bearer <access_token>}
body: {refresh_token: string}
*/
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapAsync(logoutController))
export default usersRouter

//hàm bth dùng next, throw thoải mái
// nếu dùng 1 hàm async thì chỉ có thể dùng next, dùng throw là bị lỗi
//  sửa lỗi throw bằng try catch | promise
