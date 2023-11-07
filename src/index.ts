import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes' //khai báo router
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middewares'

const app = express()
app.use(express.json())
const port = 4000
databaseService.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})
//usersRouter sử dụng 1 middleware
app.use('/users', usersRouter)
//localhost:3000/users/tweets

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
