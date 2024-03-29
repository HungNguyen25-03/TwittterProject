import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schema/User.schema'
import RefreshToken from '~/models/schema/RefreshToken.schema'
import { Follower } from '~/models/schema/Followers.chema'
import Tweet from '~/models/schema/Tweet.schema'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@tweetproject.pcf0gcv.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  get users(): Collection<User> {
    //get là getter accessor
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  async indexUsers() {
    const isExisted = await this.users.indexExists([
      'username_1',
      'email_1',
      'email_1_password_1'
    ])
    if (isExisted) return
    await this.users.createIndex({ username: 1 }, { unique: true })
    await this.users.createIndex({ email: 1 }, { unique: true })
    await this.users.createIndex({ email: 1, password: 1 })
  }

  get refreshTokens(): Collection<RefreshToken> {
    //get là getter accessor
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  async indexRefreshTokens() {
    const isExisted = await this.refreshTokens.indexExists(['token_1', 'exp_1'])
    if (isExisted) return
    await this.refreshTokens.createIndex({ token: 1 })
    await this.refreshTokens.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
  }

  async indexFollowers() {
    const isExisted = await this.followers.indexExists(['user_id_1_followed_user_id_1'])
    if (isExisted) return
    await this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }

  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService
