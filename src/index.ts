import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routes/users.routes' //khai báo router
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middewares'
import mediaRouter from './routes/medias.routes'
import { initFolder } from './utils/flie'
import { config } from 'dotenv'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import { MongoClient } from 'mongodb'
import tweetRouter from './routes/tweet.routes'
config()

const app = express()
app.use(express.json())
const port = process.env.PORT || 4000
initFolder()

databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexFollowers()
})

app.get('/', (req, res) => {
  res.send('hello world')
})
//usersRouter sử dụng 1 middleware
app.use('/users', usersRouter)
app.use('/medias', mediaRouter)
app.use('/tweets', tweetRouter)
// app.use('/static', express.static(UPLOAD_DIR))
app.use('/static', staticRouter)
// app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
//localhost:3000/users/tweets

app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
