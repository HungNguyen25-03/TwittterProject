import { Request } from 'express'
//có khả năng định nghía các thuộc tính
import { Request } from 'express'
import User from './models/schema/User.schema'

declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization?: TokenPayload
    decoded_refresh_token?: TokenPayload
  }
}
