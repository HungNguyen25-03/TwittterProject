import Tweet from '~/models/schema/Tweet.schema'
import { TweetRequestBody } from '~/models/requests/Tweet.requests'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class TweetServices {
  async createTweet(user_id: string, body: TweetRequestBody) {
    //lưu vào db
    const result = await databaseService.tweets.insertOne(
      new Tweet({
        audience: body.audience,
        content: body.content,
        hashtags: [], //để rỗng xử lý sau
        mentions: body.mentions,
        medias: body.medias,
        parent_id: body.parent_id,
        type: body.type,
        user_id: new ObjectId(user_id)
      })
    )
    //result: kết quả là object có 2 thuộc tính {acknowledged: true, insertedId: 'id của tweet vừa tạo'}
    //lấy id của tweet vừa tạo
    const tweet = await databaseService.tweets.findOne({
      _id: new ObjectId(result.insertedId)
    })
    return tweet
  }
}

const tweetServices = new TweetServices()
export default tweetServices
