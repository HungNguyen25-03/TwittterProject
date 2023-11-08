import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes' //khai báo router
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middewares'
import mediaRouter from './routes/medias.routes'
import { initFolder } from './utils/flie'
import { config } from 'dotenv'
import argv from 'minimist'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
config()

const options = argv(process.argv.slice(2))

const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
initFolder()

databaseService.connect()

app.get('/', (req, res) => {
  res.send('hello world')
})
//usersRouter sử dụng 1 middleware
app.use('/users', usersRouter)
app.use('/medias', mediaRouter)
// app.use('/static', express.static(UPLOAD_DIR))
app.use('/static', staticRouter)
//localhost:3000/users/tweets

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
