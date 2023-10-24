//khai báo
import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middewares'
import { wrapAsync } from '~/utils/handlers'
const usersRouter = Router()
//middleware

/*
des: đăng nhập
path: /users/login
method: POST
body: {email, password}
*/
usersRouter.get('/login', loginValidator, loginController)

usersRouter.post('/register', registerValidator, wrapAsync(registerController))
// đăng kí thiếu thông tin nhưng vẫn thành công vì mấy thằng isEmpty đồ chạy độc lập
export default usersRouter

//hàm bth dùng next, throw thoải mái
// nếu dùng 1 hàm async thì chỉ có thể dùng next, dùng throw là bị lỗi
//  sửa lỗi throw bằng try catch | promise
