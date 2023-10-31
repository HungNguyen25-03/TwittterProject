//khai báo
import { Router } from 'express'
import {
  emailVerifyTokenController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controller'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
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

/*
des: verify email token
khi người dùng đăng kí họ sẽ nhận đc mail có link dạng
http://localhost:3000/users/verify-email?token=<email_verify_token>
nếu mà em nhập vào link thì sẽ tạo ra req gửi lên email_verify_token lên server
server kiểm tra email_verify_token có hợp lệ hay không?
thì từ decoded_email_verify_token lấy ra user_id
và vào user_id đó để update email_verify_token thành '', verify = 1, update_at
path: /users/verify-email
method: POST
body: {email_verify_token: string}
*/
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapAsync(emailVerifyTokenController))

export default usersRouter

//hàm bth dùng next, throw thoải mái
// nếu dùng 1 hàm async thì chỉ có thể dùng next, dùng throw là bị lỗi
//  sửa lỗi throw bằng try catch | promise
