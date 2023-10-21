//khai báo
import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middewares'
const usersRouter = Router()
//middleware

//controller
usersRouter.get('/login', loginValidator, loginController)

usersRouter.post('/register', registerValidator, registerController)
// đăng kí thiếu thông tin nhưng vẫn thành công vì mấy thằng isEmpty đồ chạy độc lập
export default usersRouter
