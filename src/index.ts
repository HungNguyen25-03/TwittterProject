import express from 'express'
import usersRouter from './routes/users.routes' //khai báo router
import databaseService from './services/database.services'

const app = express()
app.use(express.json())
const port = 3000
databaseService.connect()
//usersRouter sử dụng 1 middleware
app.use('/users', usersRouter)
//localhost:3000/users/tweets

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log(`Project twitter này đang chạy trên post ${port}`)
})
