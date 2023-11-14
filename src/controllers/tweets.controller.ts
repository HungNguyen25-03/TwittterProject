import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import { TokenPayload } from '~/models/requests/user.request'
import { TWEETS_MESSAGES } from '~/constants/messages'
import tweetServices from '~/services/tweets.services'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response
) => {
  //muốn đăng bài thì cần user_id: biết ai là người đăng, body: nội dung của tweet đó
  const body = req.body as TweetRequestBody
  const { user_id } = req.decoded_authorization as TokenPayload
  //gọi hàm lưu vào db
  const result = await tweetServices.createTweet(user_id, body)
  return res.json({
    message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESSFULLY,
    result
  })
}
