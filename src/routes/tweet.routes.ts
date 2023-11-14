import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controller'
import { createTweetValidator } from '~/middlewares/tweets.middewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middewares'
import { wrapAsync } from '~/utils/handlers'

const tweetRouter = Router()

/*
des: tạo tweet
path: /tweets
method: POST
Header: {Authorization: Bearer <access_token>}
phải verify account thì mới tạo đc tweet
body: TweetRequestBody 
*/
tweetRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapAsync(createTweetController)
)

export default tweetRouter
