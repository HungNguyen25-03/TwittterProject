import { validate } from './../utils/validation'
//giả sử là anh đang làm cái route '/login'
//thì người dùng sẽ truyền email và password
//tạo 1 cái req có body là email và password
//làm 1 cái middeware ktr xem email và password có

import { NextFunction, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import userService from '~/services/users.services'

//được truyển lên hay không ?
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Missing email or password'
    })
  }
  next()
}

//khi register thì ta sẽ có 1 req.body gồm
/**
 * {
 *  name: string,
 *  email: string,
 *  password: string,
 *  confirm_password: string,
 *  date_of_birth: ISO8601
 * }
 * đặt tên theo '_' là vì chuẩn của mongo yêu cầu
 */
export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isString: true,
      trim: true,
      isLength: {
        options: {
          min: 1,
          max: 100
        }
      }
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const isExistEmail = await userService.checkEmailExist(value)
          if (isExistEmail) {
            throw new Error('email already exists')
          }
          return true
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1, // có ít nhất 1 kí tự thường
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: true
        }
      },
      errorMessage:
        'password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 8,
          max: 50
        }
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1, // có ít nhất 1 kí tự thường
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
          returnScore: true
        }
      },
      errorMessage:
        'confirm_password mus be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('confirm_password does not match password')
          }
          return true
        }
      }
    },
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
